import ClinicDashboardLayout from "@/layouts/ClinicDashboardLayout";
import {
  CashSettlementBanner,
  ExpenseModal,
  FinanceKpis,
  FinancePageHeader,
  IncomeDonut,
  RevenueFlowChart,
  TransactionsTable,
} from "@/features/clinic/finance";

// TODO(logic): خليها useState(false) وربطها بزر "تسجيل مصروفات". غيّرها لـ true دلوقتي عشان تشوف النافذة
const isExpenseModalOpen = false;

/** المدفوعات والتقارير المالية (UI فقط) */
export default function FinancePage() {
  return (
    <ClinicDashboardLayout activeNav="finance">
      <FinancePageHeader />
      <FinanceKpis />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
        <RevenueFlowChart className="lg:col-span-8" />
        <IncomeDonut className="lg:col-span-4" />
      </div>

      <CashSettlementBanner />
      <TransactionsTable />

      <ExpenseModal open={isExpenseModalOpen} />
    </ClinicDashboardLayout>
  );
}
