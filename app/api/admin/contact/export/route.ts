import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db";
import ExcelJS from "exceljs";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();

  if (!cookieStore.get("admin_session")) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { rows } = await pool.query(`
      SELECT
        id,
        full_name,
        email,
        phone,
        message,
        status,
        terms_accepted,
        created_at
      FROM contact_messages
      ORDER BY created_at DESC
    `);

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Baharan Admin Panel";
    workbook.company = "Baharan Group";
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet("Contact Messages", {
      views: [{ state: "frozen", ySplit: 3 }],
      properties: { defaultRowHeight: 22 },
    });

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Full Name", key: "full_name", width: 26 },
      { header: "Email", key: "email", width: 32 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Status", key: "status", width: 14 },
      { header: "Terms Accepted", key: "terms_accepted", width: 18 },
      { header: "Created At", key: "created_at", width: 24 },
      { header: "Message", key: "message", width: 70 },
    ];

    worksheet.mergeCells("B2:H2");
    const titleCell = worksheet.getCell("B2");
    titleCell.value = "Contact Form Submissions";
    titleCell.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "FFFFFFFF" },
    };
    titleCell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    titleCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1F4E78" },
    };

    const row2 = worksheet.getRow(2);
    if (row2) {
      row2.height = 28;
    }

    const headerRow = worksheet.getRow(3);
    headerRow.values = [
      "",
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Status",
      "Terms Accepted",
      "Created At",
      "Message",
    ];

    headerRow.height = 24;

    headerRow.eachCell((cell: ExcelJS.Cell, colNumber: number) => {
      if (colNumber === 1) return;
      cell.font = {
        name: "Calibri",
        size: 11,
        bold: true,
        color: { argb: "FFFFFFFF" },
      };
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
      };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "2F75B5" },
      };
      cell.border = {
        top: { style: "thin", color: { argb: "D9E2F3" } },
        left: { style: "thin", color: { argb: "D9E2F3" } },
        bottom: { style: "thin", color: { argb: "D9E2F3" } },
        right: { style: "thin", color: { argb: "D9E2F3" } },
      };
    });

    rows.forEach((row: any, index: number) => {
      const excelRow = worksheet.addRow({
        id: row.id,
        full_name: row.full_name ?? "",
        email: row.email ?? "",
        phone: row.phone ?? "",
        status: row.status ?? "",
        terms_accepted: row.terms_accepted ? "Yes" : "No",
        created_at: new Date(row.created_at).toLocaleString("en-US"),
        message: row.message ?? "",
      });

      excelRow.height = 24;

      excelRow.eachCell((cell: ExcelJS.Cell, colNumber: number) => {
        cell.font = {
          name: "Calibri",
          size: 11,
          color: { argb: "222222" },
        };

        cell.alignment = {
          vertical: "middle",
          horizontal:
            colNumber === 8
              ? "left"
              : colNumber === 3 || colNumber === 4
                ? "left"
                : "center",
          wrapText: colNumber === 8,
        };

        cell.border = {
          top: { style: "thin", color: { argb: "EDEDED" } },
          left: { style: "thin", color: { argb: "EDEDED" } },
          bottom: { style: "thin", color: { argb: "EDEDED" } },
          right: { style: "thin", color: { argb: "EDEDED" } },
        };

        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: index % 2 === 0 ? "FFFFFFFF" : "F8FAFC",
          },
        };
      });

      const statusCell = excelRow.getCell(5);
      if (row.status === "UNREAD") {
        statusCell.font = {
          name: "Calibri",
          size: 11,
          bold: true,
          color: { argb: "B45F06" },
        };
        statusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF2CC" },
        };
      } else {
        statusCell.font = {
          name: "Calibri",
          size: 11,
          bold: true,
          color: { argb: "38761D" },
        };
        statusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "D9EAD3" },
        };
      }

      const emailCell = excelRow.getCell(3);
      if (row.email) {
        emailCell.font = {
          name: "Calibri",
          size: 11,
          color: { argb: "0563C1" },
          underline: true,
        };
        emailCell.value = {
          text: row.email,
          hyperlink: `mailto:${row.email}`,
        };
      }

      const phoneCell = excelRow.getCell(4);
      if (row.phone) {
        phoneCell.font = {
          name: "Calibri",
          size: 11,
          color: { argb: "0563C1" },
        };
      }
    });

    worksheet.autoFilter = {
      from: "B3",
      to: "I3",
    };

    const totalRowIndex = worksheet.rowCount + 2;
    worksheet.mergeCells(`B${totalRowIndex}:D${totalRowIndex}`);
    const totalLabelCell = worksheet.getCell(`B${totalRowIndex}`);
    totalLabelCell.value = "Total Messages";
    totalLabelCell.font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "FFFFFFFF" },
    };
    totalLabelCell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    totalLabelCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1F4E78" },
    };

    const totalValueCell = worksheet.getCell(`E${totalRowIndex}`);
    totalValueCell.value = rows.length;
    totalValueCell.font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "FFFFFFFF" },
    };
    totalValueCell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    totalValueCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1F4E78" },
    };

    const unreadCount = rows.filter(
      (row: any) => row.status === "UNREAD",
    ).length;
    const readCount = rows.filter((row: any) => row.status === "READ").length;

    worksheet.getCell(`G${totalRowIndex}`).value = "Unread";
    worksheet.getCell(`G${totalRowIndex}`).font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "B45F06" },
    };
    worksheet.getCell(`G${totalRowIndex}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFF2CC" },
    };
    worksheet.getCell(`H${totalRowIndex}`).value = unreadCount;
    worksheet.getCell(`H${totalRowIndex}`).alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    worksheet.getCell(`G${totalRowIndex + 1}`).value = "Read";
    worksheet.getCell(`G${totalRowIndex + 1}`).font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "38761D" },
    };
    worksheet.getCell(`G${totalRowIndex + 1}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9EAD3" },
    };
    worksheet.getCell(`H${totalRowIndex + 1}`).value = readCount;
    worksheet.getCell(`H${totalRowIndex + 1}`).alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="contact-messages.xlsx"`,
      },
    });
  } catch (error) {
    console.error("[ADMIN_CONTACT_EXPORT_XLSX_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
