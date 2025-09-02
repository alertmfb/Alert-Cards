import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "@/components/common/shared/Table/DateRangePicker";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import {
  Download,
  FileText,
  Calendar,
  CheckCircle,
  FileSpreadsheet,
  Database,
} from "lucide-react";
import type { DateRange } from "react-day-picker";

type ExportFormat = "csv" | "excel" | "json";

type ExportDialogProps = {
  filters?: {
    dateRange?: DateRange;
  };
  onExport: (dateRange?: DateRange, format?: ExportFormat) => void;
  className?: string;
};

const ExportDialog: React.FC<ExportDialogProps> = ({
  filters,
  onExport,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange>(
    filters?.dateRange || { from: undefined, to: undefined }
  );
  const [exportFormat, setExportFormat] = React.useState<ExportFormat>("csv");
  const [isExporting, setIsExporting] = React.useState(false);

  const exportOptions = [
    {
      value: "csv" as ExportFormat,
      label: "CSV File",
      description: "Compatible with Excel, Google Sheets",
      icon: FileText,
      recommended: true,
    },
    {
      value: "excel" as ExportFormat,
      label: "Excel File",
      description: "Native Excel format with formatting",
      icon: FileSpreadsheet,
      recommended: false,
    },
    {
      value: "json" as ExportFormat,
      label: "JSON File",
      description: "Structured data for developers",
      icon: Database,
      recommended: false,
    },
  ];

  const handleExport = async () => {
    setIsExporting(true);

    const formatName = exportFormat.toUpperCase();

    // Simulate export process
    toast.info(`🚀 Preparing your ${formatName} export...`, {
      description: "Gathering card transfer data",
    });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setOpen(false);
      onExport(dateRange, exportFormat);

      toast.success("✅ Export completed successfully!", {
        description: `Your ${formatName} file has been downloaded`,
      });
    } catch (error) {
      toast.error("❌ Export failed", {
        description: "Please try again or contact support",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getFormatDetails = () => {
    switch (exportFormat) {
      case "csv":
        return {
          name: "CSV",
          description: "Comma Separated Values",
          icon: FileText,
          extension: ".csv",
        };
      case "excel":
        return {
          name: "Excel",
          description: "Microsoft Excel Spreadsheet",
          icon: FileSpreadsheet,
          extension: ".xlsx",
        };
      case "json":
        return {
          name: "JSON",
          description: "JavaScript Object Notation",
          icon: Database,
          extension: ".json",
        };
      default:
        return {
          name: "CSV",
          description: "Comma Separated Values",
          icon: FileText,
          extension: ".csv",
        };
    }
  };

  const formatDetails = getFormatDetails();

  const formatDateRange = () => {
    if (dateRange?.from && dateRange?.to) {
      return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
    }
    if (dateRange?.from) {
      return `From ${dateRange.from.toLocaleDateString()}`;
    }
    return "All time";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`gap-2 hover:bg-gray-50 transition-colors ${className}`}
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <Download className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                Export Data
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Download card transfer data in your preferred format
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Export Format Selection - Horizontal */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Format</Label>
            <RadioGroup
              value={exportFormat}
              onValueChange={(value) => setExportFormat(value as ExportFormat)}
              className="flex gap-2"
            >
              {exportOptions.map((option) => {
                const IconComponent = option.icon;
                const isSelected = exportFormat === option.value;
                return (
                  <div key={option.value} className="flex-1">
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="sr-only"
                    />
                    <label
                      htmlFor={option.value}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all hover:border-blue-300 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <IconComponent
                        className={`h-5 w-5 ${
                          isSelected ? "text-blue-600" : "text-gray-500"
                        }`}
                      />
                      <div className="text-center">
                        <div className="text-xs font-medium">
                          {option.label}
                        </div>
                        {option.recommended && (
                          <div className="text-[10px] text-green-600 font-medium mt-0.5">
                            Recommended
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Date Range Filter - Compact */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Date Range (Optional)</Label>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              className="w-full! h-9!"
            />
          </div>

          {/* Compact Export Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <formatDetails.icon className="h-4 w-4 text-blue-600" />
              <div className="text-sm">
                <span className="font-medium text-blue-900">
                  {formatDetails.name} export
                </span>
                <span className="text-blue-700 ml-2">
                  • {formatDateRange()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Footer */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={isExporting}
            className="hover:bg-gray-100"
            size="sm"
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            {isExporting ? (
              <>
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-3 w-3" />
                Export
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
