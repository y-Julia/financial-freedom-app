function id() {
  return crypto.randomUUID();
}

function createProperty(overrides = {}) {
  const base = {
    id: id(),
    name: "房产 1",
    downPaymentDate: "2026-01-01",
    price: 800000,
    downPayment: 240000,
    loanInitial: 560000,
    renovation: 80000,
    otherCost: 20000,
    monthlyRent: 2600,
    monthlyCost: 300,
    defaultMonthlyPayment: 1800,
    defaultAnnualRate: 3,
    sellDate: "2028-01-06",
    sellPrice: 200000,
    includeInPlan: true,
    mortgagePayments: [
      {
        id: id(),
        date: "2026-02-01",
        amount: 1800,
        remainingLoan: 558200,
        annualRate: 3,
      },
    ],
    prepayments: [
      {
        id: id(),
        date: "2026-03-01",
        amount: 50000,
      },
    ],
  };
  return { ...base, ...withoutUndefined(overrides) };
}

function createChild(overrides = {}) {
  const base = {
    id: id(),
    name: "孩子 1",
    startDate: "2026-10-01",
    prenatalCost: 12000,
    birthCost: 25000,
    babySetupCost: 18000,
    monthlyCost: 3500,
    educationMonthlySaving: 1000,
    years: 18,
    includeInPlan: true,
    cashflows: [
      {
        id: id(),
        date: "2027-03-10",
        direction: "expense",
        category: "medical",
        amount: 3000,
        note: "发烧看病",
      },
      {
        id: id(),
        date: "2027-04-01",
        direction: "income",
        category: "subsidy",
        amount: 1200,
        note: "育儿补贴",
      },
    ],
  };
  return { ...base, ...withoutUndefined(overrides) };
}

function withoutUndefined(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== undefined),
  );
}

const defaultState = {
  cash: 100000,
  investments: 50000,
  mortgageDebt: 300000,
  carDebt: 100000,
  otherDebt: 0,
  salary: 20000,
  sideIncome: 3000,
  livingCost: 8000,
  mortgagePayment: 5000,
  carPayment: 3000,
  fixedCost: 1000,
  goalName: "财务自由第一阶段",
  targetCash: 1000000,
  payYourselfRate: 20,
  annualReturn: 3,
  debtFreeRequired: true,
  dreamScene: "无负债，拥有 100 万安全垫",
  dreamReason: "给家庭更多选择权",
  successNote: "本月开始认真记录现金流",
  nextAction: "先把收入的 20% 存进目标账户",
  properties: [createProperty()],
  children: [createChild()],
  events: [
    {
      id: id(),
      name: "可能失业两个月",
      type: "unemployed",
      startDate: "2026-12-01",
      endDate: "2027-01-31",
      amount: 0,
    },
    {
      id: id(),
      name: "副业收入增长",
      type: "incomeDelta",
      startDate: "2028-01-01",
      endDate: "2035-12-31",
      amount: 3000,
    },
  ],
};

const MAX_MONTHS = 12 * 80;
const STORAGE_KEY = "financialFreedomDemo";
let state = loadState();
let formBound = false;
const TAB_IDS = ["status", "goal", "moneydog", "property", "child", "events", "result"];

const numberFormatter = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 });
const currencyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0,
});

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? normalizeState(JSON.parse(saved)) : structuredClone(defaultState);
  } catch {
    return structuredClone(defaultState);
  }
}

function normalizeState(saved) {
  const migratedProperty = createProperty({
    name: "房产 1",
    downPaymentDate: saved.propertyDownPaymentDate,
    price: saved.propertyPrice,
    downPayment: saved.propertyDownPayment,
    loanInitial: saved.propertyLoanInitial || saved.propertyLoanRemaining,
    renovation: saved.propertyRenovation,
    otherCost: saved.propertyOtherCost,
    monthlyRent: saved.propertyMonthlyRent,
    monthlyCost: saved.propertyMonthlyCost,
    defaultMonthlyPayment: saved.propertyDefaultMonthlyPayment,
    defaultAnnualRate: saved.propertyDefaultAnnualRate,
    sellDate: saved.propertySellDate,
    sellPrice: saved.propertySellPrice,
    includeInPlan: saved.includePropertyInPlan,
    mortgagePayments: saved.propertyMortgagePayments || [],
    prepayments: saved.propertyPrepayments || [],
  });

  const migratedChild = createChild({
    name: "孩子 1",
    startDate: saved.childStartDate,
    prenatalCost: saved.prenatalCost,
    birthCost: saved.birthCost,
    babySetupCost: saved.babySetupCost,
    monthlyCost: saved.childMonthlyCost,
    educationMonthlySaving: saved.educationMonthlySaving,
    years: saved.childYears,
    includeInPlan: saved.includeChildInPlan,
    cashflows: saved.childCashflows || (saved.childExpenses || []).map((item) => ({ ...item, direction: "expense" })),
  });

  return {
    ...structuredClone(defaultState),
    ...saved,
    properties: Array.isArray(saved.properties)
      ? saved.properties.map((property, index) => normalizeProperty(property, index))
      : [normalizeProperty(migratedProperty, 0)],
    children: Array.isArray(saved.children)
      ? saved.children.map((child, index) => normalizeChild(child, index))
      : [normalizeChild(migratedChild, 0)],
    events: Array.isArray(saved.events)
      ? saved.events.map((event, index) => normalizeEvent(event, index))
      : structuredClone(defaultState.events),
  };
}

function normalizeEvent(event, index) {
  const safeEvent = event && typeof event === "object" ? event : {};
  return {
    id: safeEvent.id || id(),
    name: safeEvent.name || `真实事件 ${index + 1}`,
    type: safeEvent.type || "oneTimeExpense",
    startDate: safeEvent.startDate || toDateInputValue(new Date()),
    endDate: safeEvent.endDate || safeEvent.startDate || toDateInputValue(new Date()),
    amount: toNumber(safeEvent.amount),
  };
}

function normalizeProperty(property, index) {
  const safeProperty = property && typeof property === "object" ? property : {};
  const normalized = createProperty({
    ...safeProperty,
    name: safeProperty.name || `房产 ${index + 1}`,
    mortgagePayments: Array.isArray(safeProperty.mortgagePayments)
      ? safeProperty.mortgagePayments
      : [],
    prepayments: Array.isArray(safeProperty.prepayments) ? safeProperty.prepayments : [],
  });
  return normalized;
}

function normalizeChild(child, index) {
  const safeChild = child && typeof child === "object" ? child : {};
  const legacyCashflows = Array.isArray(safeChild.childExpenses)
    ? safeChild.childExpenses.map((item) => ({ ...item, direction: "expense" }))
    : [];
  return createChild({
    ...safeChild,
    name: safeChild.name || `孩子 ${index + 1}`,
    cashflows: Array.isArray(safeChild.cashflows) ? safeChild.cashflows : legacyCashflows,
  });
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function money(value) {
  if (!Number.isFinite(value)) return "--";
  const abs = Math.abs(value);
  if (abs >= 10000) return `${numberFormatter.format(value / 10000)} 万`;
  return currencyFormatter.format(value);
}

function parseDate(value) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toDateInputValue(date) {
  if (!date || Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateFromMonthOffset(startDate, offset) {
  const base = typeof startDate === "string" ? parseDate(startDate) : new Date(startDate);
  if (!base || Number.isNaN(base.getTime())) return "";
  const result = new Date(base);
  result.setMonth(result.getMonth() + Math.max(0, offset));
  return toDateInputValue(result);
}

function monthIndexFromDate(anchorDate, targetDate) {
  const anchor = typeof anchorDate === "string" ? parseDate(anchorDate) : new Date(anchorDate);
  const target = typeof targetDate === "string" ? parseDate(targetDate) : new Date(targetDate);
  if (!anchor || !target || Number.isNaN(anchor.getTime()) || Number.isNaN(target.getTime())) return Infinity;
  let months = (target.getFullYear() - anchor.getFullYear()) * 12 + (target.getMonth() - anchor.getMonth());
  if (target.getDate() < anchor.getDate()) months -= 1;
  return Math.max(0, months);
}

function monthRangeFromDates(anchorDate, startDate, endDate) {
  const start = monthIndexFromDate(anchorDate, startDate);
  const end = monthIndexFromDate(anchorDate, endDate || startDate);
  return { start, end: Math.max(start, end) };
}

function formatDuration(months) {
  if (!Number.isFinite(months)) return "无法达成";
  if (months <= 0) return "现在已达成";
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest} 个月`;
  if (rest === 0) return `${years} 年`;
  return `${years} 年 ${rest} 个月`;
}

function completionDate(months) {
  if (!Number.isFinite(months)) return "--";
  const date = new Date();
  date.setMonth(date.getMonth() + Math.max(0, months));
  return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`;
}

function byDate(a, b) {
  return (parseDate(a.date)?.getTime() || 0) - (parseDate(b.date)?.getTime() || 0);
}

function buildPropertyLedger(property, untilDateValue, options = {}) {
  const untilDate = typeof untilDateValue === "string" ? parseDate(untilDateValue) : untilDateValue;
  let balance = property.loanInitial || Math.max(0, property.price - property.downPayment);
  let totalPaid = 0;
  let totalPrincipal = 0;
  let totalInterest = 0;
  const paymentRecords = property.mortgagePayments || [];
  const prepaymentRecords = property.prepayments || [];
  const projectedPayments = [];

  if (options.projectFuture && untilDate && untilDate > new Date()) {
    const untilMonth = monthIndexFromDate(new Date(), untilDate);
    for (let month = 0; month <= untilMonth; month += 1) {
      const hasRecord = paymentRecords.some((item) => monthIndexFromDate(new Date(), item.date) === month);
      if (!hasRecord) {
        projectedPayments.push({
          id: `projected-${property.id}-${month}`,
          date: dateFromMonthOffset(new Date(), month),
          amount: property.defaultMonthlyPayment,
          annualRate: property.defaultAnnualRate,
          kind: "payment",
        });
      }
    }
  }

  const entries = [
    ...paymentRecords.map((item) => ({ ...item, kind: "payment" })),
    ...prepaymentRecords.map((item) => ({ ...item, kind: "prepayment" })),
    ...projectedPayments,
  ].filter((item) => {
    const date = parseDate(item.date);
    return date && (!untilDate || date <= untilDate);
  }).sort(byDate);

  entries.forEach((entry) => {
    if (entry.kind === "prepayment") {
      const amount = Math.min(balance, toNumber(entry.amount));
      balance -= amount;
      totalPaid += amount;
      totalPrincipal += amount;
      return;
    }

    const amount = toNumber(entry.amount);
    const remainingLoan = toNumber(entry.remainingLoan);
    const rate = toNumber(entry.annualRate) || property.defaultAnnualRate;
    let principal = 0;
    let interest = 0;
    if (remainingLoan > 0) {
      principal = Math.max(0, balance - remainingLoan);
      interest = Math.max(0, amount - principal);
      balance = remainingLoan;
    } else {
      interest = Math.min(amount, balance * (rate / 100 / 12));
      principal = Math.max(0, amount - interest);
      balance = Math.max(0, balance - principal);
    }
    totalPaid += amount;
    totalPrincipal += principal;
    totalInterest += interest;
  });

  return { balance, totalPaid, totalPrincipal, totalInterest, entries };
}

function getPropertySnapshot(property, sellDateValue, sellPrice = property.sellPrice) {
  const rawMonths = monthIndexFromDate(property.downPaymentDate, sellDateValue);
  const months = Number.isFinite(rawMonths) ? Math.max(0, rawMonths + 1) : 0;
  const ledger = buildPropertyLedger(property, sellDateValue, { projectFuture: true });
  const sunkCost = property.downPayment + property.renovation + property.otherCost;
  const holdingCashOut = property.monthlyCost * months + ledger.totalPaid;
  const rentIncome = property.monthlyRent * months;
  const saleNetCash = sellPrice - ledger.balance;
  const totalOut = sunkCost + holdingCashOut;
  const totalIn = rentIncome + saleNetCash;
  return {
    months,
    remainingLoan: ledger.balance,
    rentIncome,
    saleNetCash,
    totalOut,
    totalIn,
    profit: totalIn - totalOut,
    ledger,
  };
}

function calculateProperty(property) {
  const sale = getPropertySnapshot(property, property.sellDate);
  let breakEvenMonth = Infinity;
  if (!parseDate(property.downPaymentDate)) return { sale, breakEvenMonth };
  for (let month = 0; month <= MAX_MONTHS; month += 1) {
    const sellDate = dateFromMonthOffset(property.downPaymentDate, month);
    const snapshot = getPropertySnapshot(property, sellDate, property.price);
    if (snapshot.profit >= 0) {
      breakEvenMonth = month;
      break;
    }
  }
  return { sale, breakEvenMonth };
}

function getChildSummary(child) {
  const oneTime = child.prenatalCost + child.birthCost + child.babySetupCost;
  const monthly = child.monthlyCost + child.educationMonthlySaving;
  const months = Math.max(1, child.years * 12);
  const childStart = parseDate(child.startDate);
  const childEnd = childStart ? parseDate(dateFromMonthOffset(childStart, months)) : null;
  const extra = (child.cashflows || []).reduce(
    (totals, item) => {
      const date = parseDate(item.date);
      if (!date || !childStart || !childEnd || date < childStart || date > childEnd) return totals;
      const amount = toNumber(item.amount);
      if (item.direction === "income") totals.income += amount;
      else totals.expense += amount;
      return totals;
    },
    { income: 0, expense: 0 },
  );
  return {
    oneTime,
    monthly,
    months,
    extraIncome: extra.income,
    extraExpense: extra.expense,
    total: oneTime + monthly * months + extra.expense - extra.income,
  };
}

function getPropertyAggregate() {
  const snapshots = state.properties.map((property) => ({
    property,
    current: buildPropertyLedger(property, new Date()),
    result: calculateProperty(property),
  }));
  const profit = snapshots.reduce((sum, item) => sum + item.result.sale.profit, 0);
  const debt = snapshots.reduce((sum, item) => sum + (item.property.includeInPlan ? item.current.balance : 0), 0);
  return { snapshots, profit, debt };
}

function getChildAggregate() {
  const summaries = state.children.map((child) => ({ child, summary: getChildSummary(child) }));
  const monthly = summaries.reduce((sum, item) => sum + (item.child.includeInPlan ? item.summary.monthly : 0), 0);
  const total = summaries.reduce((sum, item) => sum + item.summary.total, 0);
  return { summaries, monthly, total };
}

function getTotals(source) {
  const propertyDebt = source.properties.reduce((sum, property) => {
    return sum + (property.includeInPlan ? buildPropertyLedger(property, new Date()).balance : 0);
  }, 0);
  const totalDebt = source.mortgageDebt + source.carDebt + source.otherDebt + propertyDebt;
  const totalAssets = source.cash + source.investments;
  const propertyIncome = source.properties.reduce((sum, property) => sum + (property.includeInPlan ? property.monthlyRent : 0), 0);
  const propertyExpense = source.properties.reduce((sum, property) => {
    return sum + (property.includeInPlan ? property.defaultMonthlyPayment + property.monthlyCost : 0);
  }, 0);
  const childExpense = source.children.reduce((sum, child) => {
    return sum + (child.includeInPlan ? child.monthlyCost + child.educationMonthlySaving : 0);
  }, 0);
  const monthlyIncome = source.salary + source.sideIncome + propertyIncome;
  const monthlyExpense = source.livingCost + source.mortgagePayment + source.carPayment + source.fixedCost + propertyExpense + childExpense;
  const monthlySurplus = monthlyIncome - monthlyExpense;
  const targetGap = source.targetCash + (source.debtFreeRequired ? totalDebt : 0) - totalAssets;
  return { totalDebt, totalAssets, monthlyIncome, monthlyExpense, monthlySurplus, targetGap, netWorth: totalAssets - totalDebt };
}

function eventApplies(event, month) {
  const range = monthRangeFromDates(new Date(), event.startDate, event.endDate);
  return month >= range.start && month <= range.end;
}

function simulate(source, includeEvents = true) {
  let cash = source.cash + source.investments;
  let mortgageDebt = source.mortgageDebt;
  let carDebt = source.carDebt;
  let otherDebt = source.otherDebt;
  const propertyDebts = new Map(
    source.properties.map((property) => [property.id, property.includeInPlan ? buildPropertyLedger(property, new Date()).balance : 0]),
  );
  const monthlyReturn = Math.pow(1 + source.annualReturn / 100, 1 / 12) - 1;
  const history = [];

  for (let month = 0; month <= MAX_MONTHS; month += 1) {
    const propertyDebt = [...propertyDebts.values()].reduce((sum, value) => sum + value, 0);
    const debt = mortgageDebt + carDebt + otherDebt + propertyDebt;
    history.push({ month, cash, debt, netWorth: cash - debt });
    if (cash >= source.targetCash && (!source.debtFreeRequired || debt <= 0)) return { months: month, history };

    let income = source.salary + source.sideIncome;
    let expense = source.livingCost + source.fixedCost;
    let oneTimeCashImpact = 0;
    let debtImpact = 0;

    source.properties.forEach((property) => {
      if (!property.includeInPlan) return;
      const sellMonth = monthIndexFromDate(new Date(), property.sellDate);
      let propertyDebtNow = propertyDebts.get(property.id) || 0;
      if (month <= sellMonth) {
        income += property.monthlyRent;
        expense += property.monthlyCost;
        const recordedPayments = (property.mortgagePayments || []).filter((item) => {
          const date = parseDate(item.date);
          return date && date >= new Date() && monthIndexFromDate(new Date(), item.date) === month;
        });
        const recordedPrepayments = (property.prepayments || []).filter((item) => {
          const date = parseDate(item.date);
          return date && date >= new Date() && monthIndexFromDate(new Date(), item.date) === month;
        });
        if (recordedPayments.length === 0 && propertyDebtNow > 0) {
          const interest = propertyDebtNow * (property.defaultAnnualRate / 100 / 12);
          const principal = Math.max(0, property.defaultMonthlyPayment - interest);
          expense += property.defaultMonthlyPayment;
          propertyDebtNow = Math.max(0, propertyDebtNow - principal);
        }
        recordedPayments.forEach((payment) => {
          const amount = toNumber(payment.amount);
          const remainingLoan = toNumber(payment.remainingLoan);
          expense += amount;
          if (remainingLoan > 0) propertyDebtNow = remainingLoan;
          else {
            const rate = toNumber(payment.annualRate) || property.defaultAnnualRate;
            const interest = propertyDebtNow * (rate / 100 / 12);
            propertyDebtNow = Math.max(0, propertyDebtNow - Math.max(0, amount - interest));
          }
        });
        recordedPrepayments.forEach((prepayment) => {
          const amount = Math.min(propertyDebtNow, toNumber(prepayment.amount));
          oneTimeCashImpact -= amount;
          propertyDebtNow -= amount;
        });
      }
      if (month === sellMonth) {
        oneTimeCashImpact += property.sellPrice - propertyDebtNow;
        propertyDebtNow = 0;
      }
      propertyDebts.set(property.id, propertyDebtNow);
    });

    source.children.forEach((child) => {
      if (!child.includeInPlan) return;
      const childStartMonth = monthIndexFromDate(new Date(), child.startDate);
      if (month === childStartMonth) oneTimeCashImpact -= child.prenatalCost + child.birthCost + child.babySetupCost;
      const childEndMonth = childStartMonth + child.years * 12;
      if (month >= childStartMonth && month < childEndMonth) expense += child.monthlyCost + child.educationMonthlySaving;
      (child.cashflows || []).forEach((item) => {
        if (month === monthIndexFromDate(new Date(), item.date)) {
          const amount = toNumber(item.amount);
          oneTimeCashImpact += item.direction === "income" ? amount : -amount;
        }
      });
    });

    if (includeEvents) {
      source.events.forEach((event) => {
        if (!eventApplies(event, month)) return;
        const amount = toNumber(event.amount);
        if (event.type === "incomeDelta") income += amount;
        if (event.type === "expenseDelta") expense += amount;
        if (event.type === "oneTimeIncome" && month === monthIndexFromDate(new Date(), event.startDate)) oneTimeCashImpact += amount;
        if (event.type === "oneTimeExpense" && month === monthIndexFromDate(new Date(), event.startDate)) oneTimeCashImpact -= amount;
        if (event.type === "debtDelta" && month === monthIndexFromDate(new Date(), event.startDate)) debtImpact += amount;
        if (event.type === "unemployed") income = Math.max(0, source.sideIncome);
      });
    }

    cash *= 1 + monthlyReturn;
    cash += income - expense + oneTimeCashImpact;
    const mortgagePay = Math.min(mortgageDebt, source.mortgagePayment);
    const carPay = Math.min(carDebt, source.carPayment);
    mortgageDebt -= mortgagePay;
    carDebt -= carPay;
    cash -= mortgagePay + carPay;
    if (debtImpact > 0) otherDebt += debtImpact;
    if (debtImpact < 0) {
      const repayment = Math.min(otherDebt, Math.abs(debtImpact));
      otherDebt -= repayment;
      cash -= repayment;
    }
  }
  return { months: Infinity, history };
}

function bindForm() {
  document.querySelectorAll("[data-field]").forEach((input) => {
    const field = input.dataset.field;
    syncInputValue(input, field);
    if (formBound) return;
    input.addEventListener("input", () => {
      state[field] =
        input.type === "checkbox"
          ? input.checked
          : input.type === "text" || input.type === "date" || input.tagName === "TEXTAREA"
            ? input.value
            : toNumber(input.value);
      saveState();
      render();
    });
  });
  formBound = true;
}

function syncForm() {
  document.querySelectorAll("[data-field]").forEach((input) => syncInputValue(input, input.dataset.field));
}

function syncInputValue(input, field) {
  if (input.type === "checkbox") input.checked = Boolean(state[field]);
  else input.value = state[field] ?? "";
}

function readInputValue(input) {
  if (input.type === "checkbox") return input.checked;
  if (input.type === "number") return toNumber(input.value);
  return input.value;
}

function renderRecordList({ container, templateId, records, onChange, onDelete }) {
  const template = document.querySelector(templateId);
  container.innerHTML = "";
  records.sort(byDate).forEach((record) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelectorAll("[data-record-field]").forEach((input) => {
      const field = input.dataset.recordField;
      input.value = record[field] ?? "";
      input.addEventListener("input", () => {
        record[field] = readInputValue(input);
        onChange();
      });
    });
    node.querySelector(".delete-record").addEventListener("click", () => onDelete(record.id));
    container.appendChild(node);
  });
}

function insight(label, value) {
  return `<div class="insight-box"><span>${label}</span><strong>${value}</strong></div>`;
}

function renderProperties() {
  const list = document.querySelector("#propertyList");
  const template = document.querySelector("#propertyTemplate");
  list.innerHTML = "";
  state.properties.forEach((property, index) => {
    if (!property.name) property.name = `房产 ${index + 1}`;
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelectorAll("[data-property-field]").forEach((input) => {
      const field = input.dataset.propertyField;
      if (input.type === "checkbox") input.checked = Boolean(property[field]);
      else input.value = property[field] ?? "";
      input.addEventListener("input", () => {
        property[field] = readInputValue(input);
        saveState();
        renderResults();
      });
    });
    node.querySelector(".delete-property").addEventListener("click", () => {
      state.properties = state.properties.filter((item) => item.id !== property.id);
      saveState();
      render();
    });
    node.querySelector(".add-mortgage-payment").addEventListener("click", () => {
      property.mortgagePayments.push({
        id: id(),
        date: toDateInputValue(new Date()),
        amount: property.defaultMonthlyPayment,
        remainingLoan: buildPropertyLedger(property, new Date()).balance,
        annualRate: property.defaultAnnualRate,
      });
      saveState();
      render();
    });
    node.querySelector(".add-prepayment").addEventListener("click", () => {
      property.prepayments.push({ id: id(), date: toDateInputValue(new Date()), amount: 10000 });
      saveState();
      render();
    });
    renderRecordList({
      container: node.querySelector(".mortgage-payment-list"),
      templateId: "#mortgagePaymentTemplate",
      records: property.mortgagePayments,
      onChange: () => {
        saveState();
        renderResults();
      },
      onDelete: (recordId) => {
        property.mortgagePayments = property.mortgagePayments.filter((item) => item.id !== recordId);
        saveState();
        render();
      },
    });
    renderRecordList({
      container: node.querySelector(".prepayment-list"),
      templateId: "#prepaymentTemplate",
      records: property.prepayments,
      onChange: () => {
        saveState();
        renderResults();
      },
      onDelete: (recordId) => {
        property.prepayments = property.prepayments.filter((item) => item.id !== recordId);
        saveState();
        render();
      },
    });
    const result = calculateProperty(property);
    const current = buildPropertyLedger(property, new Date());
    node.querySelector(".property-summary").innerHTML = [
      insight("出售时净盈亏", money(result.sale.profit)),
      insight("回本时间", Number.isFinite(result.breakEvenMonth) ? formatDuration(result.breakEvenMonth) : "无法回本"),
      insight("已还本金/利息", `${money(result.sale.ledger.totalPrincipal)} / ${money(result.sale.ledger.totalInterest)}`),
      insight("当前估算剩余贷款", money(current.balance)),
      insight("出售价格", money(property.sellPrice)),
      insight("出售时剩余贷款", money(result.sale.remainingLoan)),
      insight("出售净到手", money(result.sale.saleNetCash)),
      insight("累计租金收入", money(result.sale.rentIncome)),
      insight("累计投入", money(result.sale.totalOut)),
      insight("累计收入", money(result.sale.totalIn)),
    ].join("");
    list.appendChild(node);
  });
}

function renderChildren() {
  const list = document.querySelector("#childList");
  const template = document.querySelector("#childTemplate");
  list.innerHTML = "";
  state.children.forEach((child, index) => {
    if (!child.name) child.name = `孩子 ${index + 1}`;
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelectorAll("[data-child-field]").forEach((input) => {
      const field = input.dataset.childField;
      if (input.type === "checkbox") input.checked = Boolean(child[field]);
      else input.value = child[field] ?? "";
      input.addEventListener("input", () => {
        child[field] = readInputValue(input);
        saveState();
        renderResults();
      });
    });
    node.querySelector(".delete-child").addEventListener("click", () => {
      state.children = state.children.filter((item) => item.id !== child.id);
      saveState();
      render();
    });
    node.querySelector(".add-child-cashflow").addEventListener("click", () => {
      child.cashflows.push({ id: id(), date: toDateInputValue(new Date()), direction: "expense", category: "medical", amount: 1000, note: "" });
      saveState();
      render();
    });
    renderRecordList({
      container: node.querySelector(".child-cashflow-list"),
      templateId: "#childCashflowTemplate",
      records: child.cashflows,
      onChange: () => {
        saveState();
        renderResults();
      },
      onDelete: (recordId) => {
        child.cashflows = child.cashflows.filter((item) => item.id !== recordId);
        saveState();
        render();
      },
    });
    const summary = getChildSummary(child);
    node.querySelector(".child-summary").innerHTML = [
      insight("阶段净成本", money(summary.total)),
      insight("基础月支出", money(summary.monthly)),
      insight("额外支出合计", money(summary.extraExpense)),
      insight("额外收入合计", money(summary.extraIncome)),
    ].join("");
    list.appendChild(node);
  });
}

function renderEvents() {
  const list = document.querySelector("#eventList");
  const template = document.querySelector("#eventTemplate");
  list.innerHTML = "";
  state.events.forEach((event) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelectorAll("[data-event-field]").forEach((input) => {
      const field = input.dataset.eventField;
      input.value = event[field] ?? "";
      input.addEventListener("input", () => {
        event[field] = readInputValue(input);
        saveState();
        renderResults();
      });
    });
    node.querySelector(".delete-event").addEventListener("click", () => {
      state.events = state.events.filter((item) => item.id !== event.id);
      saveState();
      render();
    });
    list.appendChild(node);
  });
}

function drawChart(history) {
  const canvas = document.querySelector("#trendChart");
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const padding = 42;
  context.clearRect(0, 0, width, height);
  const visible = history.filter((_, index) => index % 3 === 0);
  const values = visible.flatMap((item) => [item.cash, item.debt]);
  const max = Math.max(...values, state.targetCash, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;

  context.strokeStyle = "#dbe5df";
  context.lineWidth = 1;
  context.fillStyle = "#68766f";
  context.font = "14px sans-serif";
  for (let i = 0; i <= 4; i += 1) {
    const y = padding + ((height - padding * 2) / 4) * i;
    context.beginPath();
    context.moveTo(padding, y);
    context.lineTo(width - padding, y);
    context.stroke();
  }

  function point(item, key) {
    const x = padding + (item.month / Math.max(1, visible[visible.length - 1].month)) * (width - padding * 2);
    const y = height - padding - ((item[key] - min) / range) * (height - padding * 2);
    return [x, y];
  }

  function line(key, color) {
    context.strokeStyle = color;
    context.lineWidth = 4;
    context.beginPath();
    visible.forEach((item, index) => {
      const [x, y] = point(item, key);
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.stroke();
  }

  line("cash", "#1d8f65");
  line("debt", "#cf4d4d");
  context.fillStyle = "#13231d";
  context.fillText(`最高 ${money(max)}`, padding, 24);
  context.fillText("现在", padding, height - 14);
  context.fillText("目标", width - padding - 30, height - 14);
}

function renderResults() {
  const totals = getTotals(state);
  const base = simulate(state, false);
  const projected = simulate(state, true);
  const impact = projected.months - base.months;
  const propertyAgg = getPropertyAggregate();
  const childAgg = getChildAggregate();

  document.querySelector("#etaText").textContent = formatDuration(projected.months);
  document.querySelector("#etaDate").textContent = completionDate(projected.months);
  document.querySelector("#gapText").textContent = money(Math.max(0, totals.targetGap));
  document.querySelector("#monthlySurplusText").textContent = money(totals.monthlySurplus);
  document.querySelector("#netWorthText").textContent = money(totals.netWorth);
  document.querySelector("#basePlanText").textContent = `${formatDuration(base.months)} · ${completionDate(base.months)}`;
  document.querySelector("#payYourselfText").textContent = money(totals.monthlyIncome * (state.payYourselfRate / 100));
  document.querySelector("#propertyProfitText").textContent = money(propertyAgg.profit);
  document.querySelector("#propertyBreakEvenText").textContent = `${state.properties.length} 套房产汇总`;
  document.querySelector("#childCostText").textContent = money(childAgg.monthly);
  document.querySelector("#childStartText").textContent = `${state.children.length} 个孩子汇总`;

  let impactText = "无变化";
  if (Number.isFinite(impact) && impact > 0) impactText = `延后 ${formatDuration(impact)}`;
  if (Number.isFinite(impact) && impact < 0) impactText = `提前 ${formatDuration(Math.abs(impact))}`;
  if (!Number.isFinite(projected.months)) impactText = "当前计划无法达成";
  document.querySelector("#eventImpactText").textContent = impactText;
  drawChart(projected.history);

  document.querySelectorAll(".property-summary").forEach((summary, index) => {
    const item = propertyAgg.snapshots[index];
    if (!item) return;
    summary.innerHTML = [
      insight("出售时净盈亏", money(item.result.sale.profit)),
      insight("回本时间", Number.isFinite(item.result.breakEvenMonth) ? formatDuration(item.result.breakEvenMonth) : "无法回本"),
      insight("已还本金/利息", `${money(item.result.sale.ledger.totalPrincipal)} / ${money(item.result.sale.ledger.totalInterest)}`),
      insight("当前估算剩余贷款", money(item.current.balance)),
      insight("出售价格", money(item.property.sellPrice)),
      insight("出售时剩余贷款", money(item.result.sale.remainingLoan)),
      insight("出售净到手", money(item.result.sale.saleNetCash)),
      insight("累计租金收入", money(item.result.sale.rentIncome)),
      insight("累计投入", money(item.result.sale.totalOut)),
      insight("累计收入", money(item.result.sale.totalIn)),
    ].join("");
  });

  document.querySelectorAll(".child-summary").forEach((summary, index) => {
    const item = childAgg.summaries[index];
    if (!item) return;
    summary.innerHTML = [
      insight("阶段净成本", money(item.summary.total)),
      insight("基础月支出", money(item.summary.monthly)),
      insight("额外支出合计", money(item.summary.extraExpense)),
      insight("额外收入合计", money(item.summary.extraIncome)),
    ].join("");
  });
}

function render() {
  renderProperties();
  renderChildren();
  renderEvents();
  renderResults();
  activateTab(getActiveTab());
}

function getActiveTab() {
  const hash = window.location.hash.replace("#", "");
  return TAB_IDS.includes(hash) ? hash : "result";
}

function activateTab(tabId) {
  const active = TAB_IDS.includes(tabId) ? tabId : "result";
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    const belongsToActive =
      panel.id === active || panel.dataset.tabGroup === active;
    panel.hidden = !belongsToActive;
  });

  document.querySelectorAll(".steps a").forEach((link) => {
    const linkTab = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active", linkTab === active);
  });

  if (window.location.hash !== `#${active}`) {
    history.replaceState(null, "", `#${active}`);
  }
}

document.querySelectorAll(".steps a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const tabId = link.getAttribute("href")?.replace("#", "");
    activateTab(tabId);
  });
});

window.addEventListener("hashchange", () => activateTab(getActiveTab()));

document.querySelector("#addPropertyButton").addEventListener("click", () => {
  state.properties.push(createProperty({ name: `房产 ${state.properties.length + 1}` }));
  saveState();
  render();
});

document.querySelector("#addChildButton").addEventListener("click", () => {
  state.children.push(createChild({ name: `孩子 ${state.children.length + 1}` }));
  saveState();
  render();
});

document.querySelector("#addEventButton").addEventListener("click", () => {
  state.events.push({
    id: id(),
    name: "新的真实事件",
    type: "oneTimeExpense",
    startDate: toDateInputValue(new Date()),
    endDate: toDateInputValue(new Date()),
    amount: 10000,
  });
  saveState();
  render();
});

document.querySelector("#resetButton").addEventListener("click", () => {
  state = structuredClone(defaultState);
  saveState();
  syncForm();
  render();
});

bindForm();
render();
