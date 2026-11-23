using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace DoctorPatientTracking.Services.PDF
{
    public class MedicalReportDocument(MedicalReportPdfModel model) : IDocument
    {
        public DocumentMetadata GetMetadata() => DocumentMetadata.Default;
        public DocumentSettings GetSettings() => DocumentSettings.Default;

        public void Compose(IDocumentContainer container)
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(35);
                page.DefaultTextStyle(x => x.FontSize(10).FontColor(Colors.Grey.Darken3).FontFamily("Arial", "Segoe UI", "Tahoma"));

                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeContent);
                page.Footer().Element(ComposeFooter);
            });
        }

        private void ComposeHeader(IContainer container)
        {
            container.Column(col =>
            {
                col.Item().Row(row =>
                {
                    if (!string.IsNullOrWhiteSpace(model.ClinicLogoPath) && File.Exists(model.ClinicLogoPath))
                    {
                        row.ConstantItem(65).Height(65).Image(model.ClinicLogoPath).FitArea();
                        row.ConstantItem(15);
                    }

                    row.RelativeItem().Column(clinicCol =>
                    {
                        clinicCol.Item().Text(model.ClinicName)
                            .FontSize(18)
                            .Bold()
                            .FontColor(Colors.Teal.Darken3);

                        if (!string.IsNullOrWhiteSpace(model.ClinicSpecialty))
                        {
                            clinicCol.Item().Text(model.ClinicSpecialty)
                                .FontSize(11)
                                .SemiBold()
                                .FontColor(Colors.Grey.Darken1);
                        }

                        var contactParts = new List<string>();
                        if (!string.IsNullOrWhiteSpace(model.ClinicPhone))
                            contactParts.Add($"Tel: {model.ClinicPhone}");
                        if (!string.IsNullOrWhiteSpace(model.ClinicEmail))
                            contactParts.Add(model.ClinicEmail);
                        if (!string.IsNullOrWhiteSpace(model.ClinicAddress))
                            contactParts.Add(model.ClinicAddress);

                        if (contactParts.Count > 0)
                        {
                            clinicCol.Item().Text(string.Join(" | ", contactParts))
                                .FontSize(8.5f)
                                .FontColor(Colors.Grey.Medium);
                        }
                    });

                    row.ConstantItem(170).AlignRight().Column(reportCol =>
                    {
                        reportCol.Item().Text("MEDICAL REPORT & Rx")
                            .FontSize(12)
                            .Bold()
                            .FontColor(Colors.Teal.Darken3);

                        reportCol.Item().Text($"Date: {model.VisitDate:yyyy-MM-dd}")
                            .FontSize(9);

                        reportCol.Item().Text($"Queue No: #{model.QueueNumber}")
                            .FontSize(9)
                            .SemiBold();

                        if (!string.IsNullOrWhiteSpace(model.ServiceName))
                        {
                            reportCol.Item().Text($"Service: {model.ServiceName}")
                                .FontSize(8.5f)
                                .FontColor(Colors.Grey.Darken1);
                        }
                    });
                });

                col.Item().PaddingTop(10).LineHorizontal(1.5f).LineColor(Colors.Teal.Darken2);
            });
        }

        private void ComposeContent(IContainer container)
        {
            container.PaddingTop(15).Column(col =>
            {
                col.Spacing(12);

                // Patient Information Card
                col.Item().Background(Colors.Grey.Lighten4).Border(1).BorderColor(Colors.Grey.Lighten2).Padding(10).Row(row =>
                {
                    row.RelativeItem().Column(c =>
                    {
                        c.Item().Text("PATIENT NAME").FontSize(7.5f).Bold().FontColor(Colors.Grey.Darken1);
                        c.Item().Text(model.PatientName).FontSize(11).Bold().FontColor(Colors.Grey.Darken4);
                    });

                    row.RelativeItem().Column(c =>
                    {
                        c.Item().Text("AGE / GENDER").FontSize(7.5f).Bold().FontColor(Colors.Grey.Darken1);
                        var ageText = model.PatientAge.HasValue ? $"{model.PatientAge.Value} yrs" : "-";
                        c.Item().Text($"{ageText} / {model.PatientGender}").FontSize(10);
                    });

                    row.RelativeItem().Column(c =>
                    {
                        c.Item().Text("PHONE NUMBER").FontSize(7.5f).Bold().FontColor(Colors.Grey.Darken1);
                        c.Item().Text(!string.IsNullOrWhiteSpace(model.PatientPhone) ? model.PatientPhone : "-").FontSize(10);
                    });

                    row.RelativeItem().Column(c =>
                    {
                        c.Item().Text("EXAMINATION DATE").FontSize(7.5f).Bold().FontColor(Colors.Grey.Darken1);
                        c.Item().Text($"{model.VisitDate:yyyy-MM-dd}").FontSize(10);
                    });
                });

                // Clinical Notes / Diagnosis Section
                if (!string.IsNullOrWhiteSpace(model.DoctorNotes))
                {
                    col.Item().Column(notesCol =>
                    {
                        notesCol.Item().PaddingBottom(4).Text("Clinical Notes & Diagnosis / التشخيص والملاحظات")
                            .FontSize(11)
                            .Bold()
                            .FontColor(Colors.Teal.Darken3);

                        notesCol.Item().Background(Colors.Grey.Lighten5).Border(1).BorderColor(Colors.Grey.Lighten3).Padding(10)
                            .Text(model.DoctorNotes)
                            .FontSize(9.5f)
                            .LineHeight(1.3f);
                    });
                }

                // Prescription Section Header (Rx)
                col.Item().PaddingTop(5).Row(r =>
                {
                    r.AutoItem().Text("℞ ")
                        .FontSize(20)
                        .Bold()
                        .FontColor(Colors.Teal.Darken2);

                    r.RelativeItem().PaddingTop(4).Text("Prescription & Medications / الروشتة الدوائية")
                        .FontSize(12)
                        .Bold()
                        .FontColor(Colors.Teal.Darken3);
                });

                // Prescription Table
                if (model.Medicines.Count > 0)
                {
                    col.Item().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.ConstantColumn(25);      // #
                            columns.RelativeColumn(3);       // Medicine Name
                            columns.RelativeColumn(2);       // Dosage
                            columns.RelativeColumn(1.8f);    // Frequency
                            columns.RelativeColumn(1.8f);    // Duration
                            columns.RelativeColumn(3);       // Instructions / Details
                        });

                        table.Header(header =>
                        {
                            header.Cell().Element(HeaderStyle).Text("#");
                            header.Cell().Element(HeaderStyle).Text("Medicine (الدواء)");
                            header.Cell().Element(HeaderStyle).Text("Dosage (الجرعة)");
                            header.Cell().Element(HeaderStyle).Text("Frequency (التكرار)");
                            header.Cell().Element(HeaderStyle).Text("Duration (المدة)");
                            header.Cell().Element(HeaderStyle).Text("Instructions (التعليمات)");

                            static IContainer HeaderStyle(IContainer cell) =>
                                cell.Background(Colors.Teal.Darken2)
                                    .PaddingVertical(6)
                                    .PaddingHorizontal(5)
                                    .DefaultTextStyle(x => x.SemiBold().FontSize(8.5f).FontColor(Colors.White));
                        });

                        for (int i = 0; i < model.Medicines.Count; i++)
                        {
                            var med = model.Medicines[i];
                            var bg = i % 2 == 0 ? Colors.White : Colors.Grey.Lighten4;

                            table.Cell().Element(c => CellStyle(c, bg)).Text((i + 1).ToString()).FontSize(8.5f);
                            table.Cell().Element(c => CellStyle(c, bg)).Text(med.Name).Bold().FontSize(9f);
                            table.Cell().Element(c => CellStyle(c, bg)).Text(med.Dosage).FontSize(8.5f);
                            table.Cell().Element(c => CellStyle(c, bg)).Text($"{med.TimesPerDay}x / day").FontSize(8.5f);
                            table.Cell().Element(c => CellStyle(c, bg)).Text($"{med.DurationInDays} days").FontSize(8.5f);
                            table.Cell().Element(c => CellStyle(c, bg)).Text(med.Details ?? "-").FontSize(8.5f);
                        }

                        static IContainer CellStyle(IContainer cell, string backgroundColor) =>
                            cell.Background(backgroundColor)
                                .BorderBottom(1)
                                .BorderColor(Colors.Grey.Lighten3)
                                .PaddingVertical(5)
                                .PaddingHorizontal(5);
                    });
                }
                else
                {
                    col.Item().Padding(5).Text("No medications prescribed for this review.")
                        .FontSize(9.5f)
                        .Italic()
                        .FontColor(Colors.Grey.Darken1);
                }

                // Follow-up Date Box
                if (model.FollowUpDate.HasValue)
                {
                    col.Item().PaddingTop(5).Background(Colors.Amber.Lighten5).Border(1).BorderColor(Colors.Amber.Medium).Padding(8).Row(r =>
                    {
                        r.AutoItem().Text("📅 Follow-Up Visit (ميعاد الاستشارة): ")
                            .Bold()
                            .FontSize(9.5f)
                            .FontColor(Colors.Amber.Darken3);

                        r.AutoItem().Text($"{model.FollowUpDate.Value:yyyy-MM-dd}")
                            .Bold()
                            .FontSize(9.5f)
                            .FontColor(Colors.Grey.Darken4);
                    });
                }

                // Doctor Signature Area
                col.Item().PaddingTop(20).Row(row =>
                {
                    row.RelativeItem();
                    row.ConstantItem(200).Column(sigCol =>
                    {
                        sigCol.Item().Text(!string.IsNullOrWhiteSpace(model.DoctorName) ? $"Dr. {model.DoctorName}" : "Attending Physician")
                            .Bold()
                            .FontSize(10)
                            .FontColor(Colors.Grey.Darken3);

                        sigCol.Item().PaddingTop(2).Text("Doctor's Signature & Stamp")
                            .FontSize(8)
                            .FontColor(Colors.Grey.Darken1);

                        sigCol.Item().PaddingTop(30).LineHorizontal(1).LineColor(Colors.Grey.Medium);
                    });
                });
            });
        }

        private void ComposeFooter(IContainer container)
        {
            container.Column(col =>
            {
                col.Item().LineHorizontal(0.5f).LineColor(Colors.Grey.Lighten2);
                col.Item().PaddingTop(5).Row(row =>
                {
                    row.RelativeItem().Text("This document is an official medical prescription generated by the clinic tracking system.")
                        .FontSize(7.5f)
                        .FontColor(Colors.Grey.Medium);

                    row.AutoItem().Text(text =>
                    {
                        text.Span("Page ").FontSize(8).FontColor(Colors.Grey.Darken1);
                        text.CurrentPageNumber().FontSize(8).FontColor(Colors.Grey.Darken1);
                        text.Span(" of ").FontSize(8).FontColor(Colors.Grey.Darken1);
                        text.TotalPages().FontSize(8).FontColor(Colors.Grey.Darken1);
                    });
                });
            });
        }
    }
}
