function id() {
  return crypto.randomUUID();
}

function createProperty(overrides = {}) {
  const base = {
    id: id(),
    name: "房产 1",
    usage: "rent",
    downPaymentDate: "2026-01-01",
    price: 800000,
    downPayment: 240000,
    loanInitial: 560000,
    renovation: 80000,
    purchaseFees: 20000,
    salePlanned: false,
    sellDate: "",
    sellPrice: 0,
    saleCost: 0,
    saleNote: "",
    includeInPlan: true,
    rentRecords: [
      {
        id: id(),
        startMonth: "2026-02",
        endMonth: "",
        amount: 2600,
        propertyFee: 0,
        utilities: 0,
        maintenance: 0,
        otherCost: 0,
        note: "",
      },
    ],
    preRentCostRecords: [
      {
        id: id(),
        startMonth: "2026-01",
        endMonth: "2026-01",
        propertyFee: 300,
        utilities: 0,
        maintenance: 0,
        otherCost: 0,
      },
    ],
    mortgagePeriods: [
      {
        id: id(),
        startMonth: "2026-02",
        endMonth: "",
        monthlyPayment: 1800,
        annualRate: 3,
        startBalance: 560000,
        endBalance: "",
        note: "",
      },
    ],
    prepayments: [
      {
        id: id(),
        date: "2026-03-01",
        amount: 50000,
        note: "提前还本金",
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

function createMonthlyRecord(overrides = {}) {
  const base = {
    id: id(),
    month: monthKeyFromDate(new Date()),
    salaryIncome: 20000,
    sideIncome: 3000,
    rentIncome: 2600,
    otherIncome: 0,
    lastCreditCardBill: 5000,
    lastHuabeiBill: 0,
    otherLastBill: 0,
    mortgagePayment: 5000,
    carLoanPayment: 3000,
    rentPayment: 0,
    insurancePayment: 0,
    fixedOtherPayment: 1000,
    actualCashSaved: 10500,
    gooseAdded: 1000,
    earlyDebtPayment: 0,
    currentCreditCardBill: 4500,
    currentHuabeiBill: 0,
    otherNextBill: 0,
    cashAsset: 100000,
    gooseAsset: 50000,
    mortgageBalance: 300000,
    carLoanBalance: 100000,
    otherDebt: 0,
    successNote: "这个月认真完成了一次家庭财务复盘。",
    monthlyReview: "账单保持稳定，存款继续增加。",
    nextFocus: "下个月继续控制信用账单增长。",
  };
  return { ...base, ...withoutUndefined(overrides) };
}

function createDream(overrides = {}) {
  return {
    id: id(),
    name: "无负债 + 100万自由金",
    amount: 1000000,
    targetDate: "",
    reason: "让家庭拥有选择工作的底气。",
    currentAmount: 0,
    status: "inProgress",
    ...withoutUndefined(overrides),
  };
}

function createSavingsJar(overrides = {}) {
  return {
    id: id(),
    name: "安全垫罐",
    target: 60000,
    current: 0,
    monthlyPlan: 1000,
    ...withoutUndefined(overrides),
  };
}

function createJournal(overrides = {}) {
  return {
    id: id(),
    date: toDateInputValue(new Date()),
    month: monthKeyFromDate(new Date()),
    content: "这个月又把一部分钱交给了未来的自己。",
    mood: "steady",
    ...withoutUndefined(overrides),
  };
}

const defaultState = {
  savingMode: "afterBills",
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
  monthlyRecords: [createMonthlyRecord()],
  goose: {
    amount: 50000,
    monthlyAdded: 1000,
    target: 200000,
    annualReturn: 3,
    principalLocked: true,
    note: "长期投资账户",
  },
  dreams: [createDream()],
  savingsJars: [
    createSavingsJar({ name: "安全垫罐", target: 60000, current: 10000 }),
    createSavingsJar({ name: "还债罐", target: 50000, current: 0 }),
    createSavingsJar({ name: "鹅账户", target: 200000, current: 50000 }),
    createSavingsJar({ name: "孩子未来罐", target: 100000, current: 0 }),
    createSavingsJar({ name: "自由金罐", target: 1000000, current: 100000 }),
  ],
  journals: [createJournal()],
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
let saveStateTimer = null;
let renderResultsTimer = null;
const TAB_IDS = ["home", "monthly", "dreams", "goose", "debt-property", "events", "review"];

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
    usage: saved.propertyUsage || "selfUse",
    downPaymentDate: saved.propertyDownPaymentDate,
    price: saved.propertyPrice,
    downPayment: saved.propertyDownPayment,
    loanInitial: saved.propertyLoanInitial || saved.propertyLoanRemaining,
    renovation: saved.propertyRenovation,
    purchaseFees: saved.propertyOtherCost,
    sellDate: saved.propertySellDate,
    sellPrice: saved.propertySellPrice,
    salePlanned: Boolean(saved.propertySellDate && saved.propertySellPrice),
    includeInPlan: saved.includePropertyInPlan,
    mortgagePeriods: Array.isArray(saved.propertyMortgagePayments)
      ? saved.propertyMortgagePayments.map((item) => ({
          id: item.id || id(),
          startMonth: dateToMonthInput(item.date),
          endMonth: dateToMonthInput(item.date),
          monthlyPayment: item.amount,
          annualRate: item.annualRate,
          startBalance: "",
          endBalance: item.remainingLoan,
          note: "",
        }))
      : saved.propertyDefaultMonthlyPayment
        ? [{
            id: id(),
            startMonth: dateToMonthInput(saved.propertyDownPaymentDate) || dateToMonthInput(new Date()),
            endMonth: "",
            monthlyPayment: saved.propertyDefaultMonthlyPayment,
            annualRate: saved.propertyDefaultAnnualRate || 3,
            startBalance: saved.propertyLoanInitial || saved.propertyLoanRemaining || 0,
            endBalance: "",
            note: "",
          }]
        : [],
    rentRecords: saved.propertyMonthlyRent
      ? [normalizeRentRecord({}, { startMonth: dateToMonthInput(saved.propertyDownPaymentDate), amount: saved.propertyMonthlyRent })]
      : [],
    preRentCostRecords: buildLegacyPreRentCostRecords({
      downPaymentDate: saved.propertyDownPaymentDate,
      propertyFeeAmount: saved.propertyFeeAmount,
      utilitiesAmount: saved.utilitiesAmount,
      otherHoldingMonthly: saved.propertyMonthlyCost,
      usage: saved.propertyUsage,
    }),
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

  const migratedMonthlyRecord = createMonthlyRecord({
    month: monthKeyFromDate(new Date()),
    salaryIncome: saved.salary,
    sideIncome: saved.sideIncome,
    rentIncome: saved.propertyMonthlyRent || 0,
    mortgagePayment: saved.mortgagePayment,
    carLoanPayment: saved.carPayment,
    fixedOtherPayment: saved.fixedCost,
    cashAsset: saved.cash,
    gooseAsset: saved.investments,
    mortgageBalance: saved.mortgageDebt,
    carLoanBalance: saved.carDebt,
    otherDebt: saved.otherDebt,
    successNote: saved.successNote,
    nextFocus: saved.nextAction,
  });

  return {
    ...structuredClone(defaultState),
    ...saved,
    monthlyRecords: Array.isArray(saved.monthlyRecords) && saved.monthlyRecords.length
      ? saved.monthlyRecords.map(normalizeMonthlyRecord)
      : [normalizeMonthlyRecord(migratedMonthlyRecord)],
    goose: {
      ...structuredClone(defaultState.goose),
      ...(saved.goose || {}),
      amount: toNumber(saved.goose?.amount ?? saved.investments ?? defaultState.goose.amount),
    },
    dreams: Array.isArray(saved.dreams) && saved.dreams.length
      ? saved.dreams.map((dream) => createDream(dream))
      : [createDream({ name: saved.goalName, amount: saved.targetCash, reason: saved.dreamReason })],
    savingsJars: Array.isArray(saved.savingsJars) ? saved.savingsJars.map((jar) => createSavingsJar(jar)) : structuredClone(defaultState.savingsJars),
    journals: Array.isArray(saved.journals) && saved.journals.length
      ? saved.journals.map((journal) => createJournal(journal))
      : [createJournal({ content: saved.successNote })],
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

function normalizeMonthlyRecord(record) {
  const normalized = createMonthlyRecord(record);
  Object.keys(normalized).forEach((key) => {
    if (!["id", "month", "successNote", "monthlyReview", "nextFocus"].includes(key)) normalized[key] = toNumber(normalized[key]);
  });
  return normalized;
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

function cleanInternalNote(note) {
  const text = String(note || "");
  return text.includes("旧版") || text.includes("迁移") ? "" : text;
}

function normalizeHoldingCostRecord(record = {}, fallback = {}) {
  return {
    id: record.id || id(),
    startMonth: record.startMonth || fallback.startMonth || dateToMonthInput(new Date()),
    endMonth: record.endMonth || "",
    propertyFee: record.propertyFee ?? fallback.propertyFee ?? 0,
    utilities: record.utilities ?? fallback.utilities ?? 0,
    maintenance: record.maintenance ?? fallback.maintenance ?? 0,
    otherCost: record.otherCost ?? fallback.otherCost ?? 0,
  };
}

function normalizeRentRecord(record = {}, fallback = {}) {
  return {
    ...normalizeHoldingCostRecord(record, fallback),
    amount: record.amount ?? fallback.amount ?? 0,
    note: cleanInternalNote(record.note),
  };
}

function holdingCostFromRecord(record) {
  return toNumber(record.propertyFee) + toNumber(record.utilities) + toNumber(record.maintenance) + toNumber(record.otherCost);
}

function buildLegacyPreRentCostRecords(property) {
  const startMonth = dateToMonthInput(property.downPaymentDate) || dateToMonthInput(new Date());
  const propertyFee = property.propertyFeeAmount ?? property.propertyFeeMonthly ?? 0;
  const utilities = property.utilitiesAmount ?? property.utilitiesMonthly ?? 0;
  const maintenance = property.maintenanceMonthly ?? 0;
  const otherCost = property.otherHoldingMonthly ?? property.monthlyCost ?? 0;
  if (toNumber(propertyFee) + toNumber(utilities) + toNumber(maintenance) + toNumber(otherCost) <= 0) return [];
  return [normalizeHoldingCostRecord({}, { startMonth, propertyFee, utilities, maintenance, otherCost })];
}

function cleanLoanBalance(value, loanInitial) {
  if (value === "" || value === null || value === undefined) return "";
  const amount = toNumber(value);
  if (amount < 0) return "";
  return loanInitial > 0 && amount > loanInitial ? "" : amount;
}

function hasLoanBalanceValue(value, loanInitial) {
  return cleanLoanBalance(value, loanInitial) !== "";
}

function normalizeProperty(property, index) {
  const safeProperty = property && typeof property === "object" ? property : {};
  const computedLoanInitial = Math.max(0, toNumber(safeProperty.price) - toNumber(safeProperty.downPayment));
  const savedLoanInitial = toNumber(safeProperty.loanInitial || safeProperty.loanRemaining);
  const loanInitial =
    computedLoanInitial > 0 && (savedLoanInitial === 0 || savedLoanInitial === 560000 || savedLoanInitial > computedLoanInitial)
      ? computedLoanInitial
      : savedLoanInitial || computedLoanInitial;
  const normalized = createProperty({
    ...safeProperty,
    name: safeProperty.name || `房产 ${index + 1}`,
    loanInitial,
    mortgagePayments: Array.isArray(safeProperty.mortgagePayments)
      ? safeProperty.mortgagePayments
      : [],
    mortgagePeriods: Array.isArray(safeProperty.mortgagePeriods)
      ? safeProperty.mortgagePeriods.map((item) => ({
          ...item,
          id: item.id || id(),
          startBalance: cleanLoanBalance(item.startBalance, loanInitial),
          endBalance: cleanLoanBalance(item.endBalance, loanInitial),
          note: cleanInternalNote(item.note),
        }))
      : Array.isArray(safeProperty.mortgagePayments)
        ? safeProperty.mortgagePayments.map((item) => ({
            id: item.id || id(),
            startMonth: dateToMonthInput(item.date),
            endMonth: dateToMonthInput(item.date),
            monthlyPayment: item.amount,
            annualRate: item.annualRate,
            startBalance: "",
            endBalance: cleanLoanBalance(item.remainingLoan, loanInitial),
            note: "",
          }))
        : safeProperty.defaultMonthlyPayment
          ? [{
              id: id(),
              startMonth: dateToMonthInput(safeProperty.downPaymentDate) || dateToMonthInput(new Date()),
              endMonth: "",
              monthlyPayment: safeProperty.defaultMonthlyPayment,
              annualRate: safeProperty.defaultAnnualRate || 3,
              startBalance: safeProperty.loanInitial || 0,
              endBalance: "",
              note: "",
            }]
          : [],
    rentRecords: Array.isArray(safeProperty.rentRecords)
      ? safeProperty.rentRecords.map((item) => normalizeRentRecord(item, { startMonth: dateToMonthInput(safeProperty.downPaymentDate) }))
      : safeProperty.monthlyRent
        ? [normalizeRentRecord({}, { startMonth: dateToMonthInput(safeProperty.downPaymentDate), amount: safeProperty.monthlyRent })]
        : [],
    preRentCostRecords: Array.isArray(safeProperty.preRentCostRecords)
      ? safeProperty.preRentCostRecords.map((item) => normalizeHoldingCostRecord(item, { startMonth: dateToMonthInput(safeProperty.downPaymentDate) }))
      : Array.isArray(safeProperty.recurringCostRecords)
        ? safeProperty.recurringCostRecords.map((item) => normalizeHoldingCostRecord({
            id: item.id,
            startMonth: item.startMonth,
            endMonth: item.endMonth,
            propertyFee: item.type === "propertyFee" ? item.amount : 0,
            utilities: item.type === "utilities" ? item.amount : 0,
          }, { startMonth: dateToMonthInput(safeProperty.downPaymentDate) }))
        : buildLegacyPreRentCostRecords(safeProperty),
    purchaseFees: safeProperty.purchaseFees ?? safeProperty.otherCost ?? 0,
    prepayments: Array.isArray(safeProperty.prepayments) ? safeProperty.prepayments : [],
    salePlanned: Boolean(safeProperty.salePlanned || (safeProperty.sellDate && safeProperty.sellPrice)),
  });
  normalized.rentRecords = (normalized.rentRecords || []).map((record) => normalizeRentRecord(record, { startMonth: dateToMonthInput(normalized.downPaymentDate) }));
  normalized.preRentCostRecords = (normalized.preRentCostRecords || []).map((record) => normalizeHoldingCostRecord(record, { startMonth: dateToMonthInput(normalized.downPaymentDate) }));
  normalized.mortgagePeriods = (normalized.mortgagePeriods || []).map((period) => ({
    ...period,
    startBalance: cleanLoanBalance(period.startBalance, normalized.loanInitial),
    endBalance: cleanLoanBalance(period.endBalance, normalized.loanInitial),
    note: cleanInternalNote(period.note),
  }));
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
  clearTimeout(saveStateTimer);
  saveStateTimer = setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, 120);
}

function saveStateNow() {
  clearTimeout(saveStateTimer);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function scheduleRenderResults() {
  clearTimeout(renderResultsTimer);
  renderResultsTimer = setTimeout(() => {
    renderResultsTimer = null;
    renderResults();
  }, 160);
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

function exactMoney(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? currencyFormatter.format(amount) : "--";
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

function dateToMonthInput(value) {
  const date = parseDate(value);
  if (!date) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function parseMonth(value) {
  if (!value) return null;
  const [year, month] = String(value).split("-").map((item) => Number(item));
  if (!year || !month) return null;
  return new Date(year, month - 1, 1);
}

function monthKeyFromDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function addMonths(date, offset) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + offset);
  return next;
}

function monthIndexFromMonth(anchorMonth, targetMonth) {
  const anchor = typeof anchorMonth === "string" ? parseMonth(anchorMonth) : anchorMonth;
  const target = typeof targetMonth === "string" ? parseMonth(targetMonth) : targetMonth;
  if (!anchor || !target) return Infinity;
  return (target.getFullYear() - anchor.getFullYear()) * 12 + (target.getMonth() - anchor.getMonth());
}

function monthInRange(monthKey, startMonth, endMonth) {
  if (!startMonth) return false;
  const current = parseMonth(monthKey);
  const start = parseMonth(startMonth);
  const end = endMonth ? parseMonth(endMonth) : null;
  if (!current || !start) return false;
  if (current < start) return false;
  return !end || current <= end;
}

function sortByStartMonthAsc(records = []) {
  return [...records].sort((a, b) => (parseMonth(a.startMonth)?.getTime() || 0) - (parseMonth(b.startMonth)?.getTime() || 0));
}

function sortByStartMonthDesc(records = []) {
  return [...records].sort((a, b) => (parseMonth(b.startMonth)?.getTime() || 0) - (parseMonth(a.startMonth)?.getTime() || 0));
}

function rangesOverlap(first, second) {
  if (!first.startMonth || !second.startMonth) return false;
  const firstStart = parseMonth(first.startMonth);
  const secondStart = parseMonth(second.startMonth);
  if (!firstStart || !secondStart) return false;
  const firstEnd = first.endMonth ? parseMonth(first.endMonth) : new Date(9999, 11, 1);
  const secondEnd = second.endMonth ? parseMonth(second.endMonth) : new Date(9999, 11, 1);
  return firstStart <= secondEnd && secondStart <= firstEnd;
}

function getRangeValidation(records = []) {
  const errors = new Map();
  const safeRecords = Array.isArray(records) ? records : [];
  safeRecords.forEach((record) => {
    if (!record.startMonth) {
      errors.set(record.id, "请先填写开始月份");
      return;
    }
    if (record.endMonth && monthIndexFromMonth(record.startMonth, record.endMonth) < 0) {
      errors.set(record.id, "结束月份不能早于开始月份");
    }
  });

  for (let index = 0; index < safeRecords.length; index += 1) {
    for (let nextIndex = index + 1; nextIndex < safeRecords.length; nextIndex += 1) {
      const current = safeRecords[index];
      const next = safeRecords[nextIndex];
      if (current.type && next.type && current.type !== next.type) continue;
      if (rangesOverlap(current, next)) {
        const message = "这个月份已经在另一条区间中，请调整为不重叠的月份";
        if (!errors.has(current.id)) errors.set(current.id, message);
        if (!errors.has(next.id)) errors.set(next.id, message);
      }
    }
  }
  return errors;
}

function getValidRangeRecords(records = []) {
  const errors = getRangeValidation(records);
  return (Array.isArray(records) ? records : []).filter((record) => !errors.has(record.id));
}

function getNextAvailableStartMonth(records = []) {
  const sorted = sortByStartMonthAsc(Array.isArray(records) ? records.filter((record) => record.startMonth) : []);
  if (sorted.length === 0) return dateToMonthInput(new Date());
  const last = sorted.at(-1);
  if (!last.endMonth) return "";
  return monthKeyFromDate(addMonths(parseMonth(last.endMonth), 1));
}

function countMonthlyOccurrences(startMonth, endMonth, untilMonth) {
  if (!startMonth || !untilMonth) return 0;
  const end = endMonth || untilMonth;
  const endIndex = monthIndexFromMonth(startMonth, end);
  const cappedEndIndex = Math.min(endIndex, monthIndexFromMonth(startMonth, untilMonth));
  if (!Number.isFinite(cappedEndIndex) || cappedEndIndex < 0) return 0;
  return cappedEndIndex + 1;
}

function getRecurringCostTotal({ amount, frequency, payer }, months) {
  if (payer === "tenant") return 0;
  const value = toNumber(amount);
  if (frequency === "yearly") return value * Math.ceil(months / 12);
  if (frequency === "none") return 0;
  return value * months;
}

function getRecurringCostMonthly({ amount, frequency, payer }) {
  if (payer === "tenant" || frequency === "none") return 0;
  const value = toNumber(amount);
  return frequency === "yearly" ? value / 12 : value;
}

function isRentedMonth(property, monthKey) {
  return getValidRangeRecords(property.rentRecords).some((record) => monthInRange(monthKey, record.startMonth, record.endMonth));
}

function ownerPaysRecurringCost(property, payer, monthKey) {
  return payer !== "tenant" || !isRentedMonth(property, monthKey);
}

function getRecurringCostForMonth(property, { amount, frequency, payer, startMonth }, monthKey) {
  if (frequency === "none" || !ownerPaysRecurringCost(property, payer, monthKey)) return 0;
  const value = toNumber(amount);
  if (frequency === "yearly") {
    const anchorMonth = startMonth || dateToMonthInput(property.downPaymentDate) || monthKey;
    const monthOffset = monthIndexFromMonth(anchorMonth, monthKey);
    return Number.isFinite(monthOffset) && monthOffset >= 0 && monthOffset % 12 === 0 ? value : 0;
  }
  return value;
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
  const aDate = parseDate(a.date) || parseMonth(a.startMonth);
  const bDate = parseDate(b.date) || parseMonth(b.startMonth);
  return (aDate?.getTime() || 0) - (bDate?.getTime() || 0);
}

function buildPropertyLedger(property, untilDateValue, options = {}) {
  const untilDate = typeof untilDateValue === "string" ? parseDate(untilDateValue) : untilDateValue;
  let balance = property.loanInitial || Math.max(0, property.price - property.downPayment);
  const initialLoan = balance;
  let totalPaid = 0;
  let totalPrincipal = 0;
  let totalInterest = 0;
  const mortgagePeriods = sortByStartMonthAsc(getValidRangeRecords(property.mortgagePeriods));
  const prepaymentRecords = property.prepayments || [];
  const entries = [];
  const startMonth =
    dateToMonthInput(property.downPaymentDate) ||
    mortgagePeriods.find((period) => period.startMonth)?.startMonth ||
    monthKeyFromDate(new Date());
  const untilMonth = untilDate ? monthKeyFromDate(untilDate) : monthKeyFromDate(new Date());
  const monthSpan = monthIndexFromMonth(startMonth, untilMonth);
  if (!Number.isFinite(monthSpan) || monthSpan < 0) {
    return { balance, totalPaid, totalPrincipal, totalInterest, entries };
  }
  const totalMonths = monthSpan;

  for (let offset = 0; offset <= totalMonths; offset += 1) {
    const monthDate = addMonths(parseMonth(startMonth), offset);
    const monthKey = monthKeyFromDate(monthDate);
    const periodInfo = getMortgagePeriodForMonth(property, monthKey, { projectFuture: Boolean(options.projectFuture) });
    const period = periodInfo?.period;

    if (period) {
      const startBalance = cleanLoanBalance(period.startBalance, initialLoan);
      const endBalance = cleanLoanBalance(period.endBalance, initialLoan);
      if (!periodInfo.isProjected && period.startMonth === monthKey && hasLoanBalanceValue(period.startBalance, initialLoan)) {
        balance = toNumber(startBalance);
      }

      const payment = toNumber(period.monthlyPayment);
      const rate = toNumber(period.annualRate);
      let interest = Math.min(payment, balance * (rate / 100 / 12));
      let principal = Math.max(0, payment - interest);

      if (!periodInfo.isProjected && period.endMonth === monthKey && hasLoanBalanceValue(period.endBalance, initialLoan)) {
        principal = Math.max(0, balance - toNumber(endBalance));
        interest = Math.max(0, payment - principal);
        balance = toNumber(endBalance);
      } else {
        balance = Math.max(0, balance - principal);
      }

      totalPaid += payment;
      totalPrincipal += principal;
      totalInterest += interest;
      entries.push({ kind: "payment", date: `${monthKey}-01`, amount: payment, principal, interest, balance });
    }

    prepaymentRecords
      .filter((item) => dateToMonthInput(item.date) === monthKey)
      .forEach((entry) => {
        const amount = Math.min(balance, toNumber(entry.amount));
        balance -= amount;
        totalPaid += amount;
        totalPrincipal += amount;
        entries.push({ kind: "prepayment", date: entry.date, amount, principal: amount, interest: 0, balance });
      });
  }

  return { balance, totalPaid, totalPrincipal, totalInterest, entries };
}

function getComputedPeriodBalance(property, period, field) {
  if (!period?.startMonth) return "";
  const existing = cleanLoanBalance(period[field], property.loanInitial);
  if (existing !== "") return existing;
  if (field === "startBalance") {
    const start = parseMonth(period.startMonth);
    if (!start) return "";
    const previousMonth = addMonths(start, -1);
    const downPaymentMonth = parseMonth(dateToMonthInput(property.downPaymentDate));
    if (!downPaymentMonth || previousMonth < downPaymentMonth) return toNumber(property.loanInitial);
    return Math.round(buildPropertyLedger(property, previousMonth).balance);
  }
  const endMonth = period.endMonth || period.startMonth;
  const endDate = parseMonth(endMonth);
  if (!endDate) return "";
  return Math.round(buildPropertyLedger(property, endDate).balance);
}

function getMortgagePeriodForMonth(property, monthKey, options = {}) {
  const periods = sortByStartMonthAsc(getValidRangeRecords(property.mortgagePeriods));
  const active = periods.filter((period) => monthInRange(monthKey, period.startMonth, period.endMonth)).at(-1);
  if (active) return { period: active, isProjected: false };
  if (!options.projectFuture) return null;
  const current = parseMonth(monthKey);
  if (!current) return null;
  const latestPast = periods
    .filter((period) => {
      const start = parseMonth(period.startMonth);
      if (!start || start > current || toNumber(period.monthlyPayment) <= 0) return false;
      const end = period.endMonth ? parseMonth(period.endMonth) : start;
      return end && current > end;
    })
    .at(-1);
  return latestPast ? { period: latestPast, isProjected: true } : null;
}

function getMortgagePeriodBreakdown(property, period) {
  if (!period?.startMonth) return null;
  const endMonth = period.endMonth || monthKeyFromDate(new Date());
  const endDate = parseMonth(endMonth);
  if (!endDate) return null;
  const ledger = buildPropertyLedger(property, endDate);
  const entries = ledger.entries.filter((entry) => {
    if (entry.kind !== "payment") return false;
    return monthInRange(dateToMonthInput(entry.date), period.startMonth, endMonth);
  });
  if (!entries.length) return null;
  return entries.reduce(
    (total, entry) => ({
      payment: total.payment + toNumber(entry.amount),
      principal: total.principal + toNumber(entry.principal),
      interest: total.interest + toNumber(entry.interest),
    }),
    { payment: 0, principal: 0, interest: 0 },
  );
}

function formatMortgagePeriodMeta(property, period) {
  const breakdown = getMortgagePeriodBreakdown(property, period);
  if (!breakdown) return "";
  return `公式：月利息 = 月初本金 × 年利率 ÷ 12；月本金 = 月供 - 月利息。代入：累计还款 ${exactMoney(breakdown.payment)} = 本金 ${exactMoney(breakdown.principal)} + 利息 ${exactMoney(breakdown.interest)}`;
}

function getMonthlyHoldingCost(property, monthKey = monthKeyFromDate(new Date())) {
  const rentCost = getValidRangeRecords(property.rentRecords)
    .filter((record) => monthInRange(monthKey, record.startMonth, record.endMonth))
    .reduce((sum, record) => sum + holdingCostFromRecord(record), 0);
  if (rentCost > 0 || isRentedMonth(property, monthKey)) return rentCost;
  return getValidRangeRecords(property.preRentCostRecords)
    .filter((record) => monthInRange(monthKey, record.startMonth, record.endMonth))
    .reduce((sum, record) => sum + holdingCostFromRecord(record), 0);
}

function getHoldingCostTotal(property, months) {
  const startMonth = dateToMonthInput(property.downPaymentDate) || monthKeyFromDate(new Date());
  let total = 0;
  for (let offset = 0; offset < months; offset += 1) {
    total += getMonthlyHoldingCost(property, monthKeyFromDate(addMonths(parseMonth(startMonth), offset)));
  }
  return total;
}

function sumRentIncome(property, untilDateValue) {
  const untilDate = typeof untilDateValue === "string" ? parseDate(untilDateValue) : untilDateValue;
  if (!untilDate) return 0;
  const untilMonth = monthKeyFromDate(untilDate);
  return getValidRangeRecords(property.rentRecords).reduce((sum, record) => {
    if (!record.startMonth) return sum;
    return sum + countMonthlyOccurrences(record.startMonth, record.endMonth, untilMonth) * toNumber(record.amount);
  }, 0);
}

function hasSaleAssumption(property) {
  return Boolean(property.salePlanned && parseDate(property.sellDate) && toNumber(property.sellPrice) > 0);
}

function getPropertySnapshot(property, sellDateValue, sellPrice = property.sellPrice) {
  const effectiveDate = parseDate(sellDateValue) || new Date();
  const rawMonths = monthIndexFromDate(property.downPaymentDate, effectiveDate);
  const months = Number.isFinite(rawMonths) ? Math.max(0, rawMonths + 1) : 0;
  const ledger = buildPropertyLedger(property, effectiveDate, { projectFuture: true });
  const sunkCost = property.downPayment + property.renovation + property.purchaseFees;
  const holdingCashOut = getHoldingCostTotal(property, months) + ledger.totalPaid;
  const rentIncome = sumRentIncome(property, effectiveDate);
  const saleEnabled = hasSaleAssumption(property);
  const saleNetCash = saleEnabled ? sellPrice - ledger.balance - toNumber(property.saleCost) : 0;
  const totalOut = sunkCost + holdingCashOut;
  const totalIn = rentIncome + saleNetCash;
  return {
    months,
    saleEnabled,
    remainingLoan: ledger.balance,
    rentIncome,
    saleNetCash,
    totalOut,
    totalIn,
    profit: saleEnabled ? totalIn - totalOut : null,
    cashflowNet: rentIncome - holdingCashOut,
    ledger,
  };
}

function calculateProperty(property) {
  const sale = getPropertySnapshot(property, property.sellDate);
  let breakEvenMonth = Infinity;
  if (!parseDate(property.downPaymentDate) || !hasSaleAssumption(property)) return { sale, breakEvenMonth };
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
  const saleSnapshots = snapshots.filter((item) => item.result.sale.saleEnabled);
  const profit = saleSnapshots.reduce((sum, item) => sum + item.result.sale.profit, 0);
  const debt = snapshots.reduce((sum, item) => sum + (item.property.includeInPlan ? item.current.balance : 0), 0);
  return { snapshots, profit, debt, hasSale: saleSnapshots.length > 0 };
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
  const currentMonth = monthKeyFromDate(new Date());
  const propertyIncome = source.properties.reduce((sum, property) => {
    if (!property.includeInPlan) return sum;
    const rent = getValidRangeRecords(property.rentRecords)
      .filter((record) => monthInRange(currentMonth, record.startMonth, record.endMonth))
      .reduce((recordSum, record) => recordSum + toNumber(record.amount), 0);
    return sum + rent;
  }, 0);
  const propertyExpenseBreakdown = source.properties.reduce(
    (totals, property) => {
      if (!property.includeInPlan) return totals;
      const mortgage = getValidRangeRecords(property.mortgagePeriods)
        .filter((period) => monthInRange(currentMonth, period.startMonth, period.endMonth))
        .reduce((periodSum, period) => periodSum + toNumber(period.monthlyPayment), 0);
      const holding = getMonthlyHoldingCost(property, currentMonth);
      totals.mortgage += mortgage;
      totals.holding += holding;
      return totals;
    },
    { mortgage: 0, holding: 0 },
  );
  const propertyExpense = propertyExpenseBreakdown.mortgage + propertyExpenseBreakdown.holding;
  const childExpense = source.children.reduce((sum, child) => {
    return sum + (child.includeInPlan ? child.monthlyCost + child.educationMonthlySaving : 0);
  }, 0);
  const monthlyIncome = source.salary + source.sideIncome + propertyIncome;
  const monthlyExpense = source.livingCost + source.mortgagePayment + source.carPayment + source.fixedCost + propertyExpense + childExpense;
  const monthlySurplus = monthlyIncome - monthlyExpense;
  const targetGap = source.targetCash + (source.debtFreeRequired ? totalDebt : 0) - totalAssets;
  return {
    totalDebt,
    totalAssets,
    propertyDebt,
    monthlyIncome,
    monthlyExpense,
    monthlySurplus,
    targetGap,
    netWorth: totalAssets - totalDebt,
    details: {
      propertyIncome,
      propertyMortgage: propertyExpenseBreakdown.mortgage,
      propertyHolding: propertyExpenseBreakdown.holding,
      childExpense,
    },
  };
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
      const currentMonth = monthKeyFromDate(addMonths(new Date(), month));
      const sellMonth = hasSaleAssumption(property) ? monthIndexFromDate(new Date(), property.sellDate) : Infinity;
      let propertyDebtNow = propertyDebts.get(property.id) || 0;
      if (month <= sellMonth) {
        income += getValidRangeRecords(property.rentRecords)
          .filter((record) => monthInRange(currentMonth, record.startMonth, record.endMonth))
          .reduce((sum, record) => sum + toNumber(record.amount), 0);
        expense += getMonthlyHoldingCost(property, currentMonth);
        const mortgagePeriodInfo = getMortgagePeriodForMonth(property, currentMonth, { projectFuture: true });
        const mortgagePeriod = mortgagePeriodInfo?.period;
        const recordedPrepayments = (property.prepayments || []).filter((item) => {
          const date = parseDate(item.date);
          return date && date >= new Date() && monthIndexFromDate(new Date(), item.date) === month;
        });
        if (mortgagePeriod && propertyDebtNow > 0) {
          const startBalance = cleanLoanBalance(mortgagePeriod.startBalance, toNumber(property.loanInitial));
          const endBalance = cleanLoanBalance(mortgagePeriod.endBalance, toNumber(property.loanInitial));
          if (!mortgagePeriodInfo.isProjected && mortgagePeriod.startMonth === currentMonth && hasLoanBalanceValue(mortgagePeriod.startBalance, toNumber(property.loanInitial))) {
            propertyDebtNow = toNumber(startBalance);
          }
          const payment = toNumber(mortgagePeriod.monthlyPayment);
          const interest = propertyDebtNow * (toNumber(mortgagePeriod.annualRate) / 100 / 12);
          let principal = Math.max(0, payment - interest);
          if (!mortgagePeriodInfo.isProjected && mortgagePeriod.endMonth === currentMonth && hasLoanBalanceValue(mortgagePeriod.endBalance, toNumber(property.loanInitial))) {
            principal = Math.max(0, propertyDebtNow - toNumber(endBalance));
            propertyDebtNow = toNumber(endBalance);
          } else {
            propertyDebtNow = Math.max(0, propertyDebtNow - principal);
          }
          expense += payment;
        }
        recordedPrepayments.forEach((prepayment) => {
          const amount = Math.min(propertyDebtNow, toNumber(prepayment.amount));
          oneTimeCashImpact -= amount;
          propertyDebtNow -= amount;
        });
      }
      if (month === sellMonth) {
        oneTimeCashImpact += property.sellPrice - propertyDebtNow - toNumber(property.saleCost);
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
      scheduleRenderResults();
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

function renderRecordList({ container, templateId, records, onChange, onDelete, validateRanges = false, sortMode = "dateAsc", displayValue, renderMeta }) {
  const template = document.querySelector(templateId);
  if (!container || !template) return;
  container.innerHTML = "";
  const safeRecords = Array.isArray(records) ? records : [];
  const rangeErrors = validateRanges ? getRangeValidation(safeRecords) : new Map();
  const sortedRecords = sortMode === "monthDesc" ? sortByStartMonthDesc(safeRecords) : [...safeRecords].sort(byDate);
  sortedRecords.forEach((record) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const recordInputs = [...node.querySelectorAll("[data-record-field]")];
    const refreshDisplayedValues = (skipInput) => {
      if (!displayValue) return;
      recordInputs.forEach((target) => {
        if (target === skipInput) return;
        target.value = displayValue(record, target.dataset.recordField);
      });
    };
    recordInputs.forEach((input) => {
      const field = input.dataset.recordField;
      input.value = displayValue ? displayValue(record, field) : (record[field] ?? "");
      input.addEventListener("input", () => {
        record[field] = input.type === "number" && input.value === "" ? "" : readInputValue(input);
        if (validateRanges && (field === "startMonth" || field === "endMonth")) {
          onChange();
          render();
        }
        else {
          onChange();
          refreshDisplayedValues(input);
          updateMeta();
        }
      });
    });
    const meta = document.createElement("p");
    const updateMeta = () => {
      if (!renderMeta) return;
      const text = renderMeta(record);
      meta.textContent = text;
      meta.hidden = !text;
    };
    updateMeta();
    if (renderMeta) {
      meta.className = "record-meta";
      node.appendChild(meta);
    }
    if (rangeErrors.has(record.id)) {
      const error = document.createElement("p");
      error.className = "record-error";
      error.textContent = rangeErrors.get(record.id);
      node.appendChild(error);
    }
    node.querySelector(".delete-record")?.addEventListener("click", () => onDelete(record.id));
    container.appendChild(node);
  });
}

function insight(label, value, formula = "", values = "") {
  const formulaHtml = formula ? `<small class="calc-formula">公式：${formula}</small>` : "";
  const valuesHtml = values ? `<small class="calc-values">代入：${values}</small>` : "";
  return `<div class="insight-box"><span>${label}</span><strong>${value}</strong>${formulaHtml}${valuesHtml}</div>`;
}

function rentIncomeCalculation(property, untilDateValue) {
  const untilDate = typeof untilDateValue === "string" ? parseDate(untilDateValue) : untilDateValue;
  if (!untilDate) return "无有效截止日期";
  const untilMonth = monthKeyFromDate(untilDate);
  const parts = getValidRangeRecords(property.rentRecords)
    .map((record) => {
      const months = countMonthlyOccurrences(record.startMonth, record.endMonth, untilMonth);
      return months > 0 ? `${exactMoney(toNumber(record.amount))} × ${months}个月` : "";
    })
    .filter(Boolean);
  return parts.length ? parts.join(" + ") : "无有效租金区间";
}

function propertyInsightHtml(property, result, current) {
  const ledger = result.sale.ledger;
  const sunkCost = toNumber(property.downPayment) + toNumber(property.renovation) + toNumber(property.purchaseFees);
  const holdingCost = Math.max(0, result.sale.totalOut - sunkCost - ledger.totalPaid);
  const rentUntil = result.sale.saleEnabled ? property.sellDate : new Date();
  const rentIncomeLabel = result.sale.saleEnabled
    ? "累计租金收入（截至出售月，含出售当月）"
    : "累计租金收入（截至当前月，含本月）";
  const commonInsights = [
    insight(
      "当前估算剩余贷款本金",
      money(current.balance),
      "逐月以上月剩余本金扣除当月归还本金和提前还款",
      `初始贷款 ${exactMoney(toNumber(property.loanInitial))}；累计归还本金 ${exactMoney(current.totalPrincipal)}；当前剩余 ${exactMoney(current.balance)}`,
    ),
    insight(
      "累计已还本金 / 累计已还利息",
      `${money(ledger.totalPrincipal)} / ${money(ledger.totalInterest)}`,
      "月利息 = 月初本金 × 年利率 ÷ 12；月本金 = 月供 - 月利息",
      `本金 ${exactMoney(ledger.totalPrincipal)} + 利息 ${exactMoney(ledger.totalInterest)} = 累计还款 ${exactMoney(ledger.totalPaid)}`,
    ),
    insight(
      rentIncomeLabel,
      money(result.sale.rentIncome),
      "Σ（每月租金 × 区间包含月数）",
      `${rentIncomeCalculation(property, rentUntil)} = ${exactMoney(result.sale.rentIncome)}`,
    ),
    insight(
      "累计投入",
      money(result.sale.totalOut),
      "首付 + 装修 + 购房杂费 + 持有支出 + 累计房贷还款",
      `${exactMoney(property.downPayment)} + ${exactMoney(property.renovation)} + ${exactMoney(property.purchaseFees)} + ${exactMoney(holdingCost)} + ${exactMoney(ledger.totalPaid)} = ${exactMoney(result.sale.totalOut)}`,
    ),
    insight(
      "当前房产现金流净额",
      money(result.sale.cashflowNet),
      "累计租金 - 持有支出 - 累计房贷还款",
      `${exactMoney(result.sale.rentIncome)} - ${exactMoney(holdingCost)} - ${exactMoney(ledger.totalPaid)} = ${exactMoney(result.sale.cashflowNet)}`,
    ),
  ];
  const saleInsights = result.sale.saleEnabled
    ? [
        insight(
          "出售时净盈亏",
          money(result.sale.profit),
          "累计收入 - 累计投入",
          `${exactMoney(result.sale.totalIn)} - ${exactMoney(result.sale.totalOut)} = ${exactMoney(result.sale.profit)}`,
        ),
        insight(
          "回本时间",
          Number.isFinite(result.breakEvenMonth) ? formatDuration(result.breakEvenMonth) : "无法回本",
          "从购房月开始逐月累计，首次满足累计收入 ≥ 累计投入",
          Number.isFinite(result.breakEvenMonth) ? `第 ${result.breakEvenMonth} 个月达到回本` : "模拟期内累计收入始终小于累计投入",
        ),
        insight("出售价格（输入值）", money(property.sellPrice), "直接取出售假设中的预计售价", exactMoney(property.sellPrice)),
        insight(
          "出售时剩余贷款本金",
          money(result.sale.remainingLoan),
          "逐月计算至出售月后的剩余贷款本金",
          `出售月剩余本金 ${exactMoney(result.sale.remainingLoan)}`,
        ),
        insight(
          "出售净到手",
          money(result.sale.saleNetCash),
          "售价 - 出售时剩余贷款 - 出售税费/中介费",
          `${exactMoney(property.sellPrice)} - ${exactMoney(result.sale.remainingLoan)} - ${exactMoney(property.saleCost)} = ${exactMoney(result.sale.saleNetCash)}`,
        ),
        insight(
          "累计收入",
          money(result.sale.totalIn),
          "累计租金 + 出售净到手",
          `${exactMoney(result.sale.rentIncome)} + ${exactMoney(result.sale.saleNetCash)} = ${exactMoney(result.sale.totalIn)}`,
        ),
      ]
    : [insight("出售盈亏", "未设置出售假设", "只有填写出售日期和售价后才计算", "当前未参与出售测算")];
  return [...commonInsights, ...saleInsights].join("");
}

function childInsightHtml(child, summary) {
  return [
    insight(
      "阶段净成本",
      money(summary.total),
      "一次性支出 + 基础月支出 × 测算月数 + 额外支出 - 额外收入",
      `${exactMoney(summary.oneTime)} + ${exactMoney(summary.monthly)} × ${summary.months}个月 + ${exactMoney(summary.extraExpense)} - ${exactMoney(summary.extraIncome)} = ${exactMoney(summary.total)}`,
    ),
    insight(
      "基础月支出",
      money(summary.monthly),
      "每月养娃支出 + 教育金每月储备",
      `${exactMoney(child.monthlyCost)} + ${exactMoney(child.educationMonthlySaving)} = ${exactMoney(summary.monthly)}`,
    ),
    insight("额外支出合计", money(summary.extraExpense), "Σ 有效测算期内所有额外支出", exactMoney(summary.extraExpense)),
    insight("额外收入合计", money(summary.extraIncome), "Σ 有效测算期内育儿补贴、报销等收入", exactMoney(summary.extraIncome)),
  ].join("");
}

function renderProperties() {
  const list = document.querySelector("#propertyList");
  const template = document.querySelector("#propertyTemplate");
  if (!list || !template) return;
  state.properties = Array.isArray(state.properties)
    ? state.properties.map((property, index) => normalizeProperty(property, index))
    : [createProperty()];
  list.innerHTML = "";
  state.properties.forEach((property, index) => {
    if (!property.name) property.name = `房产 ${index + 1}`;
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelectorAll("[data-property-field]").forEach((input) => {
      const field = input.dataset.propertyField;
      const saleFields = ["sellDate", "sellPrice", "saleCost"];
      if (input.type === "checkbox") input.checked = Boolean(property[field]);
      else {
        input.disabled = saleFields.includes(field) && !property.salePlanned;
        input.value = input.disabled ? "" : (property[field] ?? "");
      }
      input.addEventListener("input", () => {
        property[field] = readInputValue(input);
        if (field === "salePlanned" && !property.salePlanned) {
          property.sellDate = "";
          property.sellPrice = 0;
          property.saleCost = 0;
        }
        if (field === "loanInitial") {
          property.mortgagePeriods = (property.mortgagePeriods || []).map((period) => ({
            ...period,
            startBalance: cleanLoanBalance(period.startBalance, property.loanInitial),
            endBalance: cleanLoanBalance(period.endBalance, property.loanInitial),
          }));
        }
        saveState();
        if (field === "loanInitial" || field === "salePlanned") render();
        else scheduleRenderResults();
      });
    });
    node.querySelector(".delete-property")?.addEventListener("click", () => {
      state.properties = state.properties.filter((item) => item.id !== property.id);
      saveState();
      render();
    });
    node.querySelector(".add-rent-record")?.addEventListener("click", () => {
      property.rentRecords = Array.isArray(property.rentRecords) ? property.rentRecords : [];
      const startMonth = getNextAvailableStartMonth(property.rentRecords);
      property.rentRecords.push({
        id: id(),
        startMonth,
        endMonth: "",
        amount: 0,
        propertyFee: 0,
        utilities: 0,
        maintenance: 0,
        otherCost: 0,
        note: "",
      });
      saveState();
      render();
    });
    node.querySelector(".add-pre-rent-cost")?.addEventListener("click", () => {
      property.preRentCostRecords = Array.isArray(property.preRentCostRecords) ? property.preRentCostRecords : [];
      const startMonth = dateToMonthInput(property.downPaymentDate) || dateToMonthInput(new Date());
      property.preRentCostRecords.push({
        id: id(),
        startMonth,
        endMonth: startMonth,
        propertyFee: 0,
        utilities: 0,
        maintenance: 0,
        otherCost: 0,
      });
      saveState();
      render();
    });
    node.querySelector(".add-mortgage-period")?.addEventListener("click", () => {
      property.mortgagePeriods = Array.isArray(property.mortgagePeriods) ? property.mortgagePeriods : [];
      const startMonth = getNextAvailableStartMonth(property.mortgagePeriods);
      property.mortgagePeriods.push({
        id: id(),
        startMonth,
        endMonth: startMonth,
        monthlyPayment: 0,
        annualRate: 3,
        startBalance: "",
        endBalance: "",
        note: "",
      });
      saveState();
      render();
    });
    node.querySelector(".add-prepayment")?.addEventListener("click", () => {
      property.prepayments = Array.isArray(property.prepayments) ? property.prepayments : [];
      property.prepayments.push({ id: id(), date: toDateInputValue(new Date()), amount: 10000, note: "" });
      saveState();
      render();
    });
    renderRecordList({
      container: node.querySelector(".rent-record-list"),
      templateId: "#rentRecordTemplate",
      records: property.rentRecords,
      onChange: () => {
        saveState();
        scheduleRenderResults();
      },
      onDelete: (recordId) => {
        property.rentRecords = property.rentRecords.filter((item) => item.id !== recordId);
        saveState();
        render();
      },
      validateRanges: true,
      sortMode: "monthDesc",
    });
    renderRecordList({
      container: node.querySelector(".pre-rent-cost-list"),
      templateId: "#preRentCostTemplate",
      records: property.preRentCostRecords,
      onChange: () => {
        saveState();
        scheduleRenderResults();
      },
      onDelete: (recordId) => {
        property.preRentCostRecords = property.preRentCostRecords.filter((item) => item.id !== recordId);
        saveState();
        render();
      },
      validateRanges: true,
      sortMode: "monthDesc",
    });
    renderRecordList({
      container: node.querySelector(".mortgage-period-list"),
      templateId: "#mortgagePeriodTemplate",
      records: property.mortgagePeriods,
      displayValue: (record, field) => {
        if (field === "startBalance" || field === "endBalance") return getComputedPeriodBalance(property, record, field);
        return record[field] ?? "";
      },
      renderMeta: (record) => formatMortgagePeriodMeta(property, record),
      onChange: () => {
        saveState();
        scheduleRenderResults();
      },
      onDelete: (recordId) => {
        property.mortgagePeriods = property.mortgagePeriods.filter((item) => item.id !== recordId);
        saveState();
        render();
      },
      validateRanges: true,
      sortMode: "monthDesc",
    });
    renderRecordList({
      container: node.querySelector(".prepayment-list"),
      templateId: "#prepaymentTemplate",
      records: property.prepayments,
      onChange: () => {
        saveState();
        scheduleRenderResults();
      },
      onDelete: (recordId) => {
        property.prepayments = property.prepayments.filter((item) => item.id !== recordId);
        saveState();
        render();
      },
    });
    const result = calculateProperty(property);
    const current = buildPropertyLedger(property, new Date());
    const summary = node.querySelector(".property-summary");
    if (summary) summary.innerHTML = propertyInsightHtml(property, result, current);
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
        scheduleRenderResults();
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
        scheduleRenderResults();
      },
      onDelete: (recordId) => {
        child.cashflows = child.cashflows.filter((item) => item.id !== recordId);
        saveState();
        render();
      },
    });
    const summary = getChildSummary(child);
    node.querySelector(".child-summary").innerHTML = childInsightHtml(child, summary);
    list.appendChild(node);
  });
}

function renderEvents() {
  const list = document.querySelector("#eventList");
  const template = document.querySelector("#eventTemplate");
  list.innerHTML = "";
  state.events.forEach((event) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const impactBox = document.createElement("div");
    impactBox.className = "event-impact";
    const updateImpact = () => { impactBox.innerHTML = eventImpactHtml(event); };
    node.querySelectorAll("[data-event-field]").forEach((input) => {
      const field = input.dataset.eventField;
      input.value = event[field] ?? "";
      input.addEventListener("input", () => {
        event[field] = readInputValue(input);
        saveState();
        scheduleRenderResults();
        updateImpact();
      });
    });
    node.querySelector(".delete-event").addEventListener("click", () => {
      state.events = state.events.filter((item) => item.id !== event.id);
      saveState();
      render();
    });
    updateImpact();
    node.appendChild(impactBox);
    list.appendChild(node);
  });
}

function eventImpactHtml(event) {
  const latest = getLatestMonthlyRecord();
  const base = getMonthlyRecordSummary(latest);
  if (!base) return "";
  const amount = toNumber(event.amount);
  let monthlyDelta = 0;
  let oneTimeDelta = 0;
  if (["incomeDelta", "sideGrowth"].includes(event.type)) monthlyDelta = amount;
  if (["expenseDelta", "childBirth"].includes(event.type)) monthlyDelta = -amount;
  if (event.type === "maternityLeave") monthlyDelta = -amount;
  if (event.type === "unemployed") monthlyDelta = -toNumber(latest.salaryIncome);
  if (event.type === "oneTimeIncome") oneTimeDelta = amount;
  if (["oneTimeExpense", "prepayment"].includes(event.type)) oneTimeDelta = -amount;
  if (event.type === "debtDelta") oneTimeDelta = -amount;
  const during = base.savable + monthlyDelta;
  return insight(
    "事件期间月可存金额",
    money(during),
    "当前月可存金额 + 事件月度影响",
    `${exactMoney(base.savable)} ${monthlyDelta >= 0 ? "+" : "-"} ${exactMoney(Math.abs(monthlyDelta))} = ${exactMoney(during)}${oneTimeDelta ? `；一次性现金/负债影响 ${exactMoney(oneTimeDelta)}` : ""}`,
  );
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getLatestMonthlyRecord() {
  return [...(state.monthlyRecords || [])].sort((a, b) => String(b.month).localeCompare(String(a.month)))[0] || null;
}

function getMonthlyRecordSummary(record) {
  if (!record) return null;
  const totalIncome = toNumber(record.salaryIncome) + toNumber(record.sideIncome) + toNumber(record.rentIncome) + toNumber(record.otherIncome);
  const lastBills = toNumber(record.lastCreditCardBill) + toNumber(record.lastHuabeiBill) + toNumber(record.otherLastBill);
  const fixedExpenses = toNumber(record.mortgagePayment) + toNumber(record.carLoanPayment) + toNumber(record.rentPayment) + toNumber(record.insurancePayment) + toNumber(record.fixedOtherPayment);
  const afterBillsSavable = totalIncome - lastBills - fixedExpenses;
  const payFirstSavable = toNumber(record.salaryIncome) * (toNumber(state.payYourselfRate) / 100);
  const savable = state.savingMode === "payFirst" ? payFirstSavable : afterBillsSavable;
  const actuallySaved = toNumber(record.actualCashSaved) + toNumber(record.gooseAdded) + toNumber(record.earlyDebtPayment);
  const nextBills = toNumber(record.currentCreditCardBill) + toNumber(record.currentHuabeiBill) + toNumber(record.otherNextBill);
  const billChange = nextBills - lastBills;
  const totalAssets = toNumber(record.cashAsset) + toNumber(record.gooseAsset);
  const totalDebt = toNumber(record.mortgageBalance) + toNumber(record.carLoanBalance) + toNumber(record.otherDebt);
  const netWorth = totalAssets - totalDebt;
  const targetGap = Math.max(0, toNumber(state.targetCash) + (state.debtFreeRequired ? totalDebt : 0) - totalAssets);
  const etaMonths = savable > 0 ? Math.ceil(targetGap / savable) : Infinity;
  return { totalIncome, lastBills, fixedExpenses, afterBillsSavable, payFirstSavable, savable, actuallySaved, nextBills, billChange, totalAssets, totalDebt, netWorth, targetGap, etaMonths };
}

function syncLegacyFromMonthly(record) {
  state.cash = toNumber(record.cashAsset);
  state.investments = toNumber(record.gooseAsset);
  state.mortgageDebt = toNumber(record.mortgageBalance);
  state.carDebt = toNumber(record.carLoanBalance);
  state.otherDebt = toNumber(record.otherDebt);
  state.salary = toNumber(record.salaryIncome);
  state.sideIncome = toNumber(record.sideIncome) + toNumber(record.otherIncome);
  state.mortgagePayment = toNumber(record.mortgagePayment);
  state.carPayment = toNumber(record.carLoanPayment);
  state.fixedCost = toNumber(record.rentPayment) + toNumber(record.insurancePayment) + toNumber(record.fixedOtherPayment);
  state.goose.amount = toNumber(record.gooseAsset);
  state.goose.monthlyAdded = toNumber(record.gooseAdded);
}

const monthlyGroups = [
  ["收入", [["salaryIncome", "工资收入"], ["sideIncome", "副业收入"], ["rentIncome", "房租收入"], ["otherIncome", "其他收入"]]],
  ["还清上月账单", [["lastCreditCardBill", "上月信用卡账单"], ["lastHuabeiBill", "上月花呗账单"], ["otherLastBill", "其他上月消费账单"]]],
  ["本月固定支出", [["mortgagePayment", "房贷"], ["carLoanPayment", "车贷"], ["rentPayment", "房租"], ["insurancePayment", "保险/社保/固定缴费"], ["fixedOtherPayment", "其他固定支出"]]],
  ["本月存下", [["actualCashSaved", "实际存入现金"], ["gooseAdded", "鹅账户新增"], ["earlyDebtPayment", "提前还贷金额"]]],
  ["本月新增账单（下月待还）", [["currentCreditCardBill", "本月信用卡新增消费"], ["currentHuabeiBill", "本月花呗新增消费"], ["otherNextBill", "其他下月待还"]]],
  ["月末资产负债快照", [["cashAsset", "当前现金存款"], ["gooseAsset", "当前鹅账户金额"], ["mortgageBalance", "房贷余额"], ["carLoanBalance", "车贷余额"], ["otherDebt", "其他负债"]]],
];

function renderMonthlyRecord() {
  const form = document.querySelector("#monthlyRecordForm");
  const monthInput = document.querySelector("#monthlyRecordMonth");
  if (!form || !monthInput) return;
  let record = state.monthlyRecords.find((item) => item.month === monthInput.value) || getLatestMonthlyRecord();
  if (!record) {
    record = createMonthlyRecord();
    state.monthlyRecords.push(record);
  }
  monthInput.value = record.month;
  form.innerHTML = monthlyGroups.map(([title, fields]) => `
    <fieldset class="monthly-group">
      <legend>${title}</legend>
      <div class="form-grid compact">
        ${fields.map(([field, label]) => `<label>${label}<input data-monthly-field="${field}" type="number" min="0" step="100" value="${toNumber(record[field])}" /></label>`).join("")}
      </div>
    </fieldset>`).join("") + `
    <fieldset class="monthly-group monthly-review-fields">
      <legend>月度复盘</legend>
      <div class="form-grid">
        <label>本月做得好的事<textarea data-monthly-field="successNote">${escapeHtml(record.successNote)}</textarea></label>
        <label>本月需要注意的事<textarea data-monthly-field="monthlyReview">${escapeHtml(record.monthlyReview)}</textarea></label>
        <label>下个月只改进一件事<textarea data-monthly-field="nextFocus">${escapeHtml(record.nextFocus)}</textarea></label>
      </div>
    </fieldset>`;
  form.querySelectorAll("[data-monthly-field]").forEach((input) => {
    input.addEventListener("input", () => {
      const field = input.dataset.monthlyField;
      record[field] = input.type === "number" ? toNumber(input.value) : input.value;
      syncLegacyFromMonthly(record);
      saveState();
      renderMonthlySummary(record);
      renderV2Home();
      renderDebtSnapshot();
    });
  });
  renderMonthlySummary(record);
}

function renderMonthlySummary(record) {
  const container = document.querySelector("#monthlyRecordSummary");
  if (!container) return;
  const result = getMonthlyRecordSummary(record);
  container.innerHTML = [
    insight("总收入", money(result.totalIncome), "工资 + 副业 + 房租 + 其他收入", `${exactMoney(record.salaryIncome)} + ${exactMoney(record.sideIncome)} + ${exactMoney(record.rentIncome)} + ${exactMoney(record.otherIncome)} = ${exactMoney(result.totalIncome)}`),
    insight("上月账单合计", money(result.lastBills), "信用卡 + 花呗 + 其他上月账单", `${exactMoney(record.lastCreditCardBill)} + ${exactMoney(record.lastHuabeiBill)} + ${exactMoney(record.otherLastBill)} = ${exactMoney(result.lastBills)}`),
    insight("固定支出合计", money(result.fixedExpenses), "房贷 + 车贷 + 房租 + 保险固定缴费 + 其他", `${exactMoney(record.mortgagePayment)} + ${exactMoney(record.carLoanPayment)} + ${exactMoney(record.rentPayment)} + ${exactMoney(record.insurancePayment)} + ${exactMoney(record.fixedOtherPayment)} = ${exactMoney(result.fixedExpenses)}`),
    insight(
      state.savingMode === "payFirst" ? "本月建议先存" : "本月可存金额",
      money(result.savable),
      state.savingMode === "payFirst" ? "工资收入 × 先存比例" : "总收入 - 上月账单 - 固定支出",
      state.savingMode === "payFirst" ? `${exactMoney(record.salaryIncome)} × ${toNumber(state.payYourselfRate)}% = ${exactMoney(result.savable)}` : `${exactMoney(result.totalIncome)} - ${exactMoney(result.lastBills)} - ${exactMoney(result.fixedExpenses)} = ${exactMoney(result.savable)}`,
    ),
    insight("本月实际存下", money(result.actuallySaved), "存入现金 + 喂鹅 + 提前还贷", `${exactMoney(record.actualCashSaved)} + ${exactMoney(record.gooseAdded)} + ${exactMoney(record.earlyDebtPayment)} = ${exactMoney(result.actuallySaved)}`),
    insight("下月待还账单", money(result.nextBills), "本月新增信用卡 + 花呗 + 其他待还", `${exactMoney(record.currentCreditCardBill)} + ${exactMoney(record.currentHuabeiBill)} + ${exactMoney(record.otherNextBill)} = ${exactMoney(result.nextBills)}`),
    insight("家庭净资产", money(result.netWorth), "当前总资产 - 当前总负债", `${exactMoney(result.totalAssets)} - ${exactMoney(result.totalDebt)} = ${exactMoney(result.netWorth)}`),
  ].join("");
}

function createNextMonthlyRecord(month) {
  const previous = getLatestMonthlyRecord();
  if (!previous) return createMonthlyRecord({ month });
  return createMonthlyRecord({
    ...previous,
    id: id(),
    month,
    lastCreditCardBill: previous.currentCreditCardBill,
    lastHuabeiBill: previous.currentHuabeiBill,
    otherLastBill: previous.otherNextBill,
    actualCashSaved: 0,
    gooseAdded: 0,
    earlyDebtPayment: 0,
    currentCreditCardBill: 0,
    currentHuabeiBill: 0,
    otherNextBill: 0,
    successNote: "",
    monthlyReview: "",
    nextFocus: "",
  });
}

function renderV2Home() {
  const record = getLatestMonthlyRecord();
  if (!record) return;
  const result = getMonthlyRecordSummary(record);
  document.querySelector("#homeNetWorthText").textContent = money(result.netWorth);
  document.querySelector("#homeNetWorthDetail").textContent = `代入：${exactMoney(result.totalAssets)} - ${exactMoney(result.totalDebt)} = ${exactMoney(result.netWorth)}`;
  document.querySelector("#homeGapText").textContent = money(result.targetGap);
  document.querySelector("#gapFormulaText").textContent = state.debtFreeRequired ? "公式：目标存款 + 总负债 - 当前总资产" : "公式：目标存款 - 当前总资产";
  document.querySelector("#homeGapDetail").textContent = state.debtFreeRequired
    ? `代入：${exactMoney(state.targetCash)} + ${exactMoney(result.totalDebt)} - ${exactMoney(result.totalAssets)} = ${exactMoney(result.targetGap)}`
    : `代入：${exactMoney(state.targetCash)} - ${exactMoney(result.totalAssets)} = ${exactMoney(result.targetGap)}`;
  document.querySelector("#homeSavableText").textContent = money(result.savable);
  document.querySelector("#homeSavableFormula").textContent = state.savingMode === "payFirst" ? "公式：工资收入 × 先存比例" : "公式：总收入 - 上月账单 - 固定支出";
  document.querySelector("#homeSavableDetail").textContent = state.savingMode === "payFirst"
    ? `代入：${exactMoney(record.salaryIncome)} × ${toNumber(state.payYourselfRate)}% = ${exactMoney(result.savable)}`
    : `代入：${exactMoney(result.totalIncome)} - ${exactMoney(result.lastBills)} - ${exactMoney(result.fixedExpenses)} = ${exactMoney(result.savable)}`;
  document.querySelector("#homeNextBillText").textContent = money(result.nextBills);
  document.querySelector("#homeNextBillDetail").textContent = `代入：${exactMoney(record.currentCreditCardBill)} + ${exactMoney(record.currentHuabeiBill)} + ${exactMoney(record.otherNextBill)} = ${exactMoney(result.nextBills)}`;
  document.querySelector("#homeEtaText").textContent = formatDuration(result.etaMonths);
  document.querySelector("#homeEtaDetail").textContent = Number.isFinite(result.etaMonths) ? `代入：${exactMoney(result.targetGap)} ÷ ${exactMoney(result.savable)} = ${result.etaMonths}个月` : "代入：本月可存金额不大于0，暂时无法估算";
  const gooseTarget = toNumber(state.goose.target);
  const gooseProgress = gooseTarget > 0 ? toNumber(state.goose.amount) / gooseTarget : 0;
  document.querySelector("#homeGooseText").textContent = money(state.goose.amount);
  document.querySelector("#homeGooseDetail").textContent = `代入：${exactMoney(state.goose.amount)} ÷ ${exactMoney(gooseTarget)} = ${(gooseProgress * 100).toFixed(1)}%`;
  document.querySelector("#homeAllocationLines").innerHTML = [
    ["本月总收入", result.totalIncome], ["还上月账单", -result.lastBills], ["固定支出", -result.fixedExpenses], ["本月可存金额", result.savable],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${exactMoney(value)}</strong></div>`).join("");
  const billStatus = result.billChange > 0 ? "下月待还账单增加" : result.billChange < 0 ? "本月消费压力下降" : "账单保持稳定";
  document.querySelector("#homeBillStatus").textContent = billStatus;
  document.querySelector("#homeBillMessage").textContent = `上月账单 ${exactMoney(result.lastBills)}，下月待还 ${exactMoney(result.nextBills)}，变化 ${exactMoney(result.billChange)}。`;
  const mainDream = state.dreams.find((dream) => dream.status !== "done") || state.dreams[0];
  document.querySelector("#homeDreamTitle").textContent = mainDream?.name || state.goalName;
  document.querySelector("#homeDreamAction").textContent = `本月行动：争取存下 ${exactMoney(result.savable)}，同时让下月账单不增长。`;
  const journal = [...state.journals].sort((a, b) => String(b.date).localeCompare(String(a.date)))[0];
  document.querySelector("#homeJournalText").textContent = journal?.content || "写下一件做对的事，让进步被看见。";
  drawChart([...state.monthlyRecords].sort((a, b) => String(a.month).localeCompare(String(b.month))).map((item, index) => {
    const summary = getMonthlyRecordSummary(item);
    return { month: index, cash: summary.totalAssets, debt: summary.totalDebt };
  }));
}

function renderDreamsV2() {
  const list = document.querySelector("#dreamList");
  const jars = document.querySelector("#savingsJarList");
  if (!list || !jars) return;
  document.querySelectorAll("[data-v2-config]").forEach((input) => {
    const field = input.dataset.v2Config;
    if (input.type === "checkbox") input.checked = Boolean(state[field]);
    else input.value = state[field] ?? "";
    input.oninput = () => {
      state[field] = input.type === "checkbox" ? input.checked : input.type === "number" ? toNumber(input.value) : input.value;
      saveState(); renderV2Home(); renderMonthlySummary(getLatestMonthlyRecord());
    };
  });
  list.innerHTML = state.dreams.map((dream) => `
    <article class="entity-card dream-card" data-dream-id="${dream.id}">
      <div class="entity-head"><input class="entity-name" data-dream-field="name" value="${escapeHtml(dream.name)}" /><button class="icon-button delete-dream" type="button">×</button></div>
      <div class="form-grid compact">
        <label>目标金额<input data-dream-field="amount" type="number" min="0" value="${toNumber(dream.amount)}" /></label>
        <label>当前金额<input data-dream-field="currentAmount" type="number" min="0" value="${toNumber(dream.currentAmount)}" /></label>
        <label>目标时间<input data-dream-field="targetDate" type="date" value="${escapeHtml(dream.targetDate)}" /></label>
        <label>当前状态<select data-dream-field="status"><option value="notStarted">未开始</option><option value="inProgress">进行中</option><option value="done">已完成</option></select></label>
        <label>为什么重要<textarea data-dream-field="reason">${escapeHtml(dream.reason)}</textarea></label>
      </div>
      <div class="progress-track"><span style="width:${Math.min(100, toNumber(dream.amount) > 0 ? toNumber(dream.currentAmount) / toNumber(dream.amount) * 100 : 0)}%"></span></div>
      <small class="calc-values">进度：${exactMoney(dream.currentAmount)} ÷ ${exactMoney(dream.amount)} = ${(toNumber(dream.amount) > 0 ? toNumber(dream.currentAmount) / toNumber(dream.amount) * 100 : 0).toFixed(1)}%</small>
    </article>`).join("");
  list.querySelectorAll("[data-dream-id]").forEach((card) => {
    const dream = state.dreams.find((item) => item.id === card.dataset.dreamId);
    card.querySelector(`[data-dream-field="status"]`).value = dream.status;
    card.querySelectorAll("[data-dream-field]").forEach((input) => input.addEventListener("change", () => {
      dream[input.dataset.dreamField] = input.type === "number" ? toNumber(input.value) : input.value;
      saveState(); renderDreamsV2(); renderV2Home();
    }));
    card.querySelector(".delete-dream").addEventListener("click", () => { state.dreams = state.dreams.filter((item) => item.id !== dream.id); saveStateNow(); renderDreamsV2(); });
  });
  jars.innerHTML = state.savingsJars.map((jar) => `
    <article class="jar-card" data-jar-id="${jar.id}">
      <div class="entity-head"><input class="entity-name" data-jar-field="name" value="${escapeHtml(jar.name)}" /><button class="icon-button delete-jar" type="button">×</button></div>
      <label>目标<input data-jar-field="target" type="number" min="0" value="${toNumber(jar.target)}" /></label>
      <label>当前<input data-jar-field="current" type="number" min="0" value="${toNumber(jar.current)}" /></label>
      <label>每月计划<input data-jar-field="monthlyPlan" type="number" min="0" value="${toNumber(jar.monthlyPlan)}" /></label>
      <div class="progress-track"><span style="width:${Math.min(100, toNumber(jar.target) > 0 ? toNumber(jar.current) / toNumber(jar.target) * 100 : 0)}%"></span></div>
      <small>${exactMoney(jar.current)} / ${exactMoney(jar.target)}</small>
    </article>`).join("");
  jars.querySelectorAll("[data-jar-id]").forEach((card) => {
    const jar = state.savingsJars.find((item) => item.id === card.dataset.jarId);
    card.querySelectorAll("[data-jar-field]").forEach((input) => input.addEventListener("change", () => { jar[input.dataset.jarField] = input.type === "number" ? toNumber(input.value) : input.value; saveState(); renderDreamsV2(); }));
    card.querySelector(".delete-jar").addEventListener("click", () => { state.savingsJars = state.savingsJars.filter((item) => item.id !== jar.id); saveStateNow(); renderDreamsV2(); });
  });
}

function renderGooseV2() {
  const form = document.querySelector("#gooseForm");
  const summary = document.querySelector("#gooseSummary");
  if (!form || !summary) return;
  form.querySelectorAll("[data-goose-field]").forEach((input) => {
    const field = input.dataset.gooseField;
    if (input.type === "checkbox") input.checked = Boolean(state.goose[field]);
    else input.value = state.goose[field] ?? "";
    input.oninput = () => {
      state.goose[field] = input.type === "checkbox" ? input.checked : input.type === "number" ? toNumber(input.value) : input.value;
      const latest = getLatestMonthlyRecord();
      if (field === "amount" && latest) { latest.gooseAsset = state.goose.amount; syncLegacyFromMonthly(latest); }
      saveState(); renderGooseSummary(); renderV2Home();
    };
  });
  renderGooseSummary();
}

function renderGooseSummary() {
  const summary = document.querySelector("#gooseSummary");
  if (!summary) return;
  const progress = toNumber(state.goose.target) > 0 ? toNumber(state.goose.amount) / toNumber(state.goose.target) : 0;
  const yearLater = toNumber(state.goose.amount) * (1 + toNumber(state.goose.annualReturn) / 100) + toNumber(state.goose.monthlyAdded) * 12;
  summary.innerHTML = [
    insight("鹅账户当前金额", money(state.goose.amount), "读取长期投资资产", exactMoney(state.goose.amount)),
    insight("本月喂鹅金额", money(state.goose.monthlyAdded), "本月新增长期投资", exactMoney(state.goose.monthlyAdded)),
    insight("鹅账户进度", `${(progress * 100).toFixed(1)}%`, "当前金额 ÷ 目标金额", `${exactMoney(state.goose.amount)} ÷ ${exactMoney(state.goose.target)}`),
    insight("预计一年后金额", money(yearLater), "当前金额 ×（1 + 年化收益率）+ 月新增 × 12", `${exactMoney(state.goose.amount)} × (1 + ${toNumber(state.goose.annualReturn)}%) + ${exactMoney(state.goose.monthlyAdded)} × 12 = ${exactMoney(yearLater)}`),
  ].join("");
}

function renderDebtSnapshot() {
  const container = document.querySelector("#debtSnapshot");
  const record = getLatestMonthlyRecord();
  if (!container || !record) return;
  const result = getMonthlyRecordSummary(record);
  container.innerHTML = [
    insight("房贷余额", money(record.mortgageBalance), "读取最新月度记录", exactMoney(record.mortgageBalance)),
    insight("车贷余额", money(record.carLoanBalance), "读取最新月度记录", exactMoney(record.carLoanBalance)),
    insight("其他负债", money(record.otherDebt), "读取最新月度记录", exactMoney(record.otherDebt)),
    insight("家庭总负债", money(result.totalDebt), "房贷 + 车贷 + 其他负债", `${exactMoney(record.mortgageBalance)} + ${exactMoney(record.carLoanBalance)} + ${exactMoney(record.otherDebt)} = ${exactMoney(result.totalDebt)}`),
  ].join("");
}

function renderReviewV2() {
  const list = document.querySelector("#journalList");
  const summary = document.querySelector("#monthlyReviewSummary");
  if (!list || !summary) return;
  list.innerHTML = [...state.journals].sort((a, b) => String(b.date).localeCompare(String(a.date))).map((journal) => `
    <article class="record-card journal-card" data-journal-id="${journal.id}">
      <label>日期<input data-journal-field="date" type="date" value="${journal.date}" /></label>
      <label>所属月份<input data-journal-field="month" type="month" value="${journal.month}" /></label>
      <label>成功事项<textarea data-journal-field="content">${escapeHtml(journal.content)}</textarea></label>
      <label>心情<select data-journal-field="mood"><option value="steady">平静</option><option value="happy">开心</option><option value="proud">自豪</option><option value="tired">有点累</option></select></label>
      <button class="icon-button delete-journal" type="button">×</button>
    </article>`).join("");
  list.querySelectorAll("[data-journal-id]").forEach((card) => {
    const journal = state.journals.find((item) => item.id === card.dataset.journalId);
    card.querySelector(`[data-journal-field="mood"]`).value = journal.mood;
    card.querySelectorAll("[data-journal-field]").forEach((input) => input.addEventListener("input", () => { journal[input.dataset.journalField] = input.value; saveState(); renderV2Home(); }));
    card.querySelector(".delete-journal").addEventListener("click", () => { state.journals = state.journals.filter((item) => item.id !== journal.id); saveStateNow(); renderReviewV2(); renderV2Home(); });
  });
  const latest = getLatestMonthlyRecord();
  const result = getMonthlyRecordSummary(latest);
  const previous = [...state.monthlyRecords].sort((a, b) => String(b.month).localeCompare(String(a.month)))[1];
  const previousResult = previous ? getMonthlyRecordSummary(previous) : null;
  const netChange = previousResult ? result.netWorth - previousResult.netWorth : 0;
  summary.innerHTML = latest ? `
    <p class="eyebrow">${latest.month} 月度总结</p>
    <h3>这个月，你把 ${exactMoney(result.actuallySaved)} 交给了未来的自己。</h3>
    <p>下月待还账单 ${exactMoney(result.nextBills)}，家庭净资产 ${previousResult ? `较上月变化 ${exactMoney(netChange)}` : `为 ${exactMoney(result.netWorth)}`}。</p>
    <div class="review-copy"><strong>做得好的事</strong><p>${escapeHtml(latest.successNote || "还没有填写")}</p></div>
    <div class="review-copy"><strong>需要注意</strong><p>${escapeHtml(latest.monthlyReview || "还没有填写")}</p></div>
    <div class="review-copy"><strong>下月唯一重点</strong><p>${escapeHtml(latest.nextFocus || "还没有填写")}</p></div>` : "<p>先完成一条月度记录，再开始复盘。</p>";
}

function drawChart(history) {
  const canvas = document.querySelector("#trendChart");
  if (!canvas || canvas.closest(".tab-panel")?.hidden) return;
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
  const propertyAgg = getPropertyAggregate();
  const childAgg = getChildAggregate();
  renderV2Home();

  document.querySelectorAll(".property-summary").forEach((summary, index) => {
    const item = propertyAgg.snapshots[index];
    if (!item) return;
    summary.innerHTML = propertyInsightHtml(item.property, item.result, item.current);
  });

  document.querySelectorAll(".child-summary").forEach((summary, index) => {
    const item = childAgg.summaries[index];
    if (!item) return;
    summary.innerHTML = childInsightHtml(item.child, item.summary);
  });
}

function render() {
  renderProperties();
  renderChildren();
  renderEvents();
  renderMonthlyRecord();
  renderDreamsV2();
  renderGooseV2();
  renderDebtSnapshot();
  renderReviewV2();
  renderResults();
  activateTab(getActiveTab());
}

function getActiveTab() {
  const hash = window.location.hash.replace("#", "");
  return TAB_IDS.includes(hash) ? hash : "home";
}

function activateTab(tabId) {
  const active = TAB_IDS.includes(tabId) ? tabId : "home";
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
  if (active === "home") requestAnimationFrame(() => renderV2Home());
}

document.querySelectorAll(".steps a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const tabId = link.getAttribute("href")?.replace("#", "");
    activateTab(tabId);
  });
});

window.addEventListener("hashchange", () => activateTab(getActiveTab()));

document.querySelector("#monthlyRecordMonth")?.addEventListener("change", (event) => {
  if (state.monthlyRecords.some((item) => item.month === event.target.value)) renderMonthlyRecord();
});

document.querySelector("#newMonthlyRecordButton")?.addEventListener("click", () => {
  const month = document.querySelector("#monthlyRecordMonth").value || monthKeyFromDate(new Date());
  let record = state.monthlyRecords.find((item) => item.month === month);
  if (!record) {
    record = createNextMonthlyRecord(month);
    state.monthlyRecords.push(record);
    saveStateNow();
  }
  renderMonthlyRecord();
});

document.querySelector("#saveMonthlyRecordButton")?.addEventListener("click", () => {
  const record = state.monthlyRecords.find((item) => item.month === document.querySelector("#monthlyRecordMonth").value) || getLatestMonthlyRecord();
  if (record) syncLegacyFromMonthly(record);
  saveStateNow();
  render();
  activateTab("monthly");
});

document.querySelector("#addDreamButton")?.addEventListener("click", () => {
  state.dreams.push(createDream({ name: `新梦想 ${state.dreams.length + 1}`, amount: 50000 }));
  saveStateNow(); renderDreamsV2();
});

document.querySelector("#addSavingsJarButton")?.addEventListener("click", () => {
  state.savingsJars.push(createSavingsJar({ name: `储蓄罐 ${state.savingsJars.length + 1}` }));
  saveStateNow(); renderDreamsV2();
});

document.querySelector("#addJournalButton")?.addEventListener("click", () => {
  state.journals.push(createJournal({ content: "" }));
  saveStateNow(); renderReviewV2();
});

document.querySelector("#addPropertyButton").addEventListener("click", () => {
  state.properties = Array.isArray(state.properties) ? state.properties : [];
  state.properties.push(createProperty({ name: `房产 ${state.properties.length + 1}` }));
  saveStateNow();
  render();
});

document.querySelector("#addChildButton").addEventListener("click", () => {
  state.children.push(createChild({ name: `孩子 ${state.children.length + 1}` }));
  saveStateNow();
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
  saveStateNow();
  render();
});

document.querySelector("#resetButton").addEventListener("click", () => {
  state = structuredClone(defaultState);
  saveStateNow();
  syncForm();
  render();
});

bindForm();
render();
