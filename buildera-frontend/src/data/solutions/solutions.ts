import type { SolutionPageData } from '@/types/service-page'

export const solutions: SolutionPageData[] = [
  {
    slug: 'operations-mgmt',
    title: 'Operations Management',
    heroHeadline: 'Stop Running Your Operations on Spreadsheets',
    heroSubheadline: 'Custom operations management software that gives you real-time visibility across your entire business — from orders to deliveries to invoices — in one place.',
    problemPoints: [
      'Your team tracks orders, inventory, and deliveries across three different spreadsheets that are always out of sync.',
      'There is no real-time visibility into order status — customers call your team for updates your team has to look up manually.',
      'Departments work in silos: sales promises stock the warehouse doesn\'t have, and finance reconciles numbers a week late.',
    ],
    featureCards: [
      {
        title: 'Real-Time Operations Dashboard',
        description: 'Every order, every shipment, every inventory level visible in one live dashboard — updated the moment anything changes.',
        metric: 'See everything, decide faster',
      },
      {
        title: 'Automated Workflow Engine',
        description: 'Define your business rules once. The system routes tasks, triggers approvals, and sends notifications automatically.',
      },
      {
        title: 'Cross-Department Data Sync',
        description: 'Sales, warehouse, finance, and logistics all work from the same live data. Silos eliminated, miscommunication gone.',
      },
      {
        title: 'Custom Reporting & Analytics',
        description: 'Daily operations reports, weekly performance summaries, and on-demand analytics — generated automatically from your live data.',
      },
    ],
    industriesServed: ['manufacturing', 'logistics', 'retail', 'hospitality'],
    relatedServices: ['software-development', 'ai-agent-development'],
    ctaHeadline: 'Ready to Streamline Your Operations?',
  },
  {
    slug: 'vendor-mgmt',
    title: 'Vendor Management',
    heroHeadline: 'Stop Chasing Vendors With WhatsApp Messages',
    heroSubheadline: 'A custom vendor management portal that centralises POs, tracks deliveries, manages contracts, and flags issues before they become supply disruptions.',
    problemPoints: [
      'Your vendors are sending wrong quantities and wrong invoices — and your team catches it manually, hours too late.',
      'Purchase orders live in email threads that nobody can search when a dispute arises three months later.',
      'You have no visibility into vendor performance — the worst supplier gets the same orders as the best one.',
    ],
    featureCards: [
      {
        title: 'Centralised PO & Contract Management',
        description: 'Every purchase order, contract, and amendment in one searchable system. Disputes resolved in minutes, not days.',
        metric: 'Zero lost POs',
      },
      {
        title: 'Vendor Performance Scorecards',
        description: 'Automatic scoring on delivery accuracy, lead time, and quality. Route more orders to your best vendors automatically.',
      },
      {
        title: 'Three-Way Invoice Matching',
        description: 'PO, delivery receipt, and invoice matched automatically. Discrepancies flagged before payment — not after.',
      },
      {
        title: 'Vendor Self-Service Portal',
        description: 'Vendors log in to view their POs, upload invoices, and check payment status — without calling your team.',
      },
    ],
    industriesServed: ['manufacturing', 'retail', 'logistics', 'hospitality'],
    relatedServices: ['software-development', 'ai-agent-development'],
    ctaHeadline: 'Ready to Take Control of Your Vendor Relationships?',
  },
  {
    slug: 'ota-channel',
    title: 'OTA Channel Partner Management',
    heroHeadline: 'Manage Every OTA Channel From One Dashboard',
    heroSubheadline: 'Stop manually updating rates on Booking.com, Expedia, and MakeMyTrip one by one. A custom channel manager that pushes rate changes and availability across every OTA in real time.',
    problemPoints: [
      'You are updating room rates on five OTAs manually — an hour of work every rate change, with constant risk of pricing errors.',
      'Double-bookings happen because availability updates don\'t sync across channels fast enough.',
      'You have no consolidated view of which OTA is driving the most revenue at the best margin.',
    ],
    featureCards: [
      {
        title: 'Real-Time Rate & Availability Sync',
        description: 'Change a rate once. It pushes to every connected OTA within seconds — no manual updates, no pricing inconsistencies.',
        metric: 'Updates in under 60 seconds',
      },
      {
        title: 'Centralised Booking Inbox',
        description: 'Every booking from every channel lands in one inbox. Confirmations, modifications, and cancellations handled from one place.',
      },
      {
        title: 'OTA Revenue Attribution',
        description: 'See exactly how much revenue each OTA generates, at what average rate, after commission costs. Know where to invest your inventory.',
      },
      {
        title: 'Yield Management Rules',
        description: 'Automate pricing based on occupancy thresholds. When occupancy hits 80%, rates rise automatically — no manual intervention needed.',
      },
    ],
    industriesServed: ['hospitality'],
    relatedServices: ['software-development', 'salesforce-development'],
    ctaHeadline: 'Ready to Centralise Your OTA Operations?',
  },
  {
    slug: 'supply-chain',
    title: 'Supply Chain Management',
    heroHeadline: 'End-to-End Supply Chain Visibility — From Supplier to Customer',
    heroSubheadline: 'Track every order, every shipment, and every inventory movement across your supply chain in real time. Stop firefighting disruptions and start anticipating them.',
    problemPoints: [
      'You don\'t know where a shipment is until it either arrives or your customer calls to ask where it is.',
      'Stockouts happen because reorder points are calculated on last month\'s data, not today\'s actual demand.',
      'Supply chain disruptions cascade through your operations because you don\'t see the upstream warning signs early enough.',
    ],
    featureCards: [
      {
        title: 'Live Shipment Tracking',
        description: 'Every purchase order tracked from supplier dispatch to warehouse receipt. Status updates in real time — shared automatically with relevant stakeholders.',
        metric: '100% shipment visibility',
      },
      {
        title: 'Demand Forecasting',
        description: 'AI-driven demand forecasts built on your historical sales, seasonality, and current order pipeline. Reorder before you run out.',
      },
      {
        title: 'Supplier Lead Time Monitoring',
        description: 'Automatic alerts when a supplier\'s actual lead time deviates from their SLA. React to delays before they hit your customers.',
      },
      {
        title: 'Inventory Optimisation',
        description: 'Dynamic safety stock calculations that balance holding cost against stockout risk. Less capital tied up, fewer stockouts.',
      },
    ],
    industriesServed: ['manufacturing', 'logistics', 'retail'],
    relatedServices: ['software-development', 'ai-agent-development'],
    ctaHeadline: 'Ready for Supply Chain That Runs Itself?',
  },
  {
    slug: 'project-mgmt',
    title: 'Project Management',
    heroHeadline: 'Every Project Delivered On Time — With Full Visibility',
    heroSubheadline: 'A custom project management system that tracks tasks, resources, timelines, and budgets in one place — built for how your teams actually work, not for how a generic tool assumes they work.',
    problemPoints: [
      'Projects run over budget because no one has a live view of actual hours spent vs hours budgeted until it\'s too late.',
      'Status updates require chasing team members individually — managers spend Fridays sending "where are we?" messages.',
      'Scope creep goes undetected until the project is 80% done and the budget is already blown.',
    ],
    featureCards: [
      {
        title: 'Real-Time Project Dashboard',
        description: 'Budget consumed, tasks completed, and days remaining — visible to every stakeholder at any moment. Status calls become optional.',
        metric: 'Zero surprise overruns',
      },
      {
        title: 'Resource Allocation & Utilisation',
        description: 'See which team members are over-allocated and which have capacity before assigning new work. No more burnout from poor planning.',
      },
      {
        title: 'Automated Status Reports',
        description: 'Weekly project status reports generated and distributed automatically from live task data. No manual writing, always accurate.',
      },
      {
        title: 'Scope Change Management',
        description: 'Client change requests captured, costed, and approved in the system — with automatic impact on timeline and budget calculated.',
      },
    ],
    industriesServed: ['professional-services', 'manufacturing', 'finance', 'logistics'],
    relatedServices: ['software-development', 'salesforce-development'],
    ctaHeadline: 'Ready to Deliver Every Project On Time and On Budget?',
  },
  {
    slug: 'accounting-mgmt',
    title: 'Accounting Management',
    heroHeadline: 'Accounts That Close in Hours, Not Days',
    heroSubheadline: 'Automate your invoicing, expense tracking, and financial reporting so your finance team stops spending 40% of their month on data entry and starts on analysis.',
    problemPoints: [
      'Month-end close takes your finance team a full week because reconciliation is done manually across spreadsheets.',
      'Invoices are raised late because the sales team hasn\'t communicated milestones — costing you cash flow.',
      'You have no real-time view of cash flow — decisions get made on last month\'s numbers that are already stale.',
    ],
    featureCards: [
      {
        title: 'Automated Invoicing',
        description: 'Invoices triggered automatically when milestones are hit or orders are fulfilled — no manual step, no delays in billing.',
        metric: '3x faster invoice cycle',
      },
      {
        title: 'Real-Time Cash Flow Dashboard',
        description: 'Outstanding receivables, upcoming payables, and projected cash position visible today — not next month after reconciliation.',
      },
      {
        title: 'Expense Approval Workflows',
        description: 'Expenses submitted via mobile, routed for approval by policy, and posted to the correct cost centre automatically.',
      },
      {
        title: 'Financial Reporting Automation',
        description: 'P&L, balance sheet, and cash flow statement generated from live data on demand. Month-end becomes a review, not a production exercise.',
      },
    ],
    industriesServed: ['professional-services', 'manufacturing', 'retail', 'finance'],
    relatedServices: ['software-development', 'ai-agent-development'],
    ctaHeadline: 'Ready to Cut Your Month-End Close From Days to Hours?',
  },
  {
    slug: 'warehouse-mgmt',
    title: 'Warehouse Management',
    heroHeadline: 'Know Exactly What\'s in Your Warehouse at Every Moment',
    heroSubheadline: 'A custom WMS that tracks stock from goods-in to dispatch, eliminates picking errors, and gives you real-time inventory accuracy — without expensive enterprise software.',
    problemPoints: [
      'Stock counts are done manually at month-end — and the numbers never match what the spreadsheet says.',
      'Picking errors are causing returns and customer complaints that your warehouse team spends days resolving.',
      'You don\'t know your slow-moving stock until it\'s been sitting for 6 months tying up working capital.',
    ],
    featureCards: [
      {
        title: 'Real-Time Stock Tracking',
        description: 'Every goods receipt, pick, and dispatch updates inventory instantly. You always know exactly what\'s in stock, where it is, and when it\'s moving.',
        metric: '99.8% inventory accuracy',
      },
      {
        title: 'Barcode & QR Code Scanning',
        description: 'Mobile scanning for goods receipt, put-away, and picking. Eliminates manual entry errors at every touchpoint.',
      },
      {
        title: 'Smart Pick Routing',
        description: 'Optimised pick routes that minimise travel time in the warehouse. The same orders picked in 30% less time.',
      },
      {
        title: 'Slow-Moving Stock Alerts',
        description: 'Automatic alerts when SKUs haven\'t moved in your configured threshold. Act before dead stock becomes a write-off.',
      },
    ],
    industriesServed: ['manufacturing', 'retail', 'logistics'],
    relatedServices: ['software-development', 'ai-agent-development'],
    ctaHeadline: 'Ready for a Warehouse That Runs on Accuracy?',
  },
  {
    slug: 'hotels-resorts',
    title: 'Hotels & Resorts Management',
    heroHeadline: 'Run Your Hotel Like a Chain — At Independent Rates',
    heroSubheadline: 'A custom hotel management system covering reservations, front desk, housekeeping, F&B, and reporting — built for independent hotels and boutique resorts who can\'t afford enterprise PMS pricing.',
    problemPoints: [
      'Your reservation and front desk systems don\'t talk to each other — check-in takes 10 minutes because staff manually looks up the booking.',
      'Housekeeping assigns rooms by word of mouth — guests arrive at dirty rooms because the status update never reached the right person.',
      'Revenue management is done on instinct — you\'re leaving occupancy-based pricing on the table every peak season.',
    ],
    featureCards: [
      {
        title: 'Unified Reservation & Front Desk',
        description: 'One system from booking to check-out. Walk-ins, OTA bookings, and direct reservations all managed from the same screen.',
        metric: 'Check-in in under 2 minutes',
      },
      {
        title: 'Housekeeping Task Management',
        description: 'Room status updated in real time via mobile. Housekeeping knows which rooms to clean, in what order, and marks them ready from their phone.',
      },
      {
        title: 'F&B & Restaurant Integration',
        description: 'Restaurant bills posted directly to the room account. Zero manual transcription, zero billing disputes at checkout.',
      },
      {
        title: 'Revenue & Occupancy Analytics',
        description: 'RevPAR, ADR, and occupancy trends visible daily. Dynamic rate recommendations based on booking pace and competitor rates.',
      },
    ],
    industriesServed: ['hospitality'],
    relatedServices: ['software-development', 'salesforce-development'],
    ctaHeadline: 'Ready to Run Your Hotel With Real Software?',
  },
  {
    slug: 'financial-mgmt',
    title: 'Financial Management',
    heroHeadline: 'Financial Decisions Made on Live Data, Not Last Month\'s Reports',
    heroSubheadline: 'Custom financial management software that automates reconciliation, tracks budgets vs actuals in real time, and gives decision-makers the numbers they need without waiting for the finance team.',
    problemPoints: [
      'Budget vs actual reporting is a monthly exercise that takes your finance team three days to produce — by which time the decisions are already made.',
      'Expense approvals sit in email inboxes for days, slowing down the operations that depend on timely vendor payments.',
      'No consolidated view across multiple business units or entities — consolidation is done manually in Excel once a quarter.',
    ],
    featureCards: [
      {
        title: 'Live Budget vs Actuals',
        description: 'Every approved expense and revenue booking updates the budget dashboard in real time. Managers see variances the moment they occur.',
        metric: 'Decisions based on today\'s numbers',
      },
      {
        title: 'Multi-Entity Consolidation',
        description: 'Financials across multiple business units consolidated automatically — with elimination entries, intercompany reconciliation, and minority interest calculated.',
      },
      {
        title: 'Approval Workflow Automation',
        description: 'Expense and payment approval chains configured by policy, executed automatically. Urgent approvals escalated after a defined wait period.',
      },
      {
        title: 'Treasury & Cash Management',
        description: 'Bank balance visibility, payment scheduling, and 13-week cash flow forecasting — updated from live receivables and payables data.',
      },
    ],
    industriesServed: ['finance', 'professional-services', 'manufacturing'],
    relatedServices: ['software-development', 'ai-agent-development'],
    ctaHeadline: 'Ready to Make Financial Decisions With Confidence?',
  },
  {
    slug: 'fleet-mgmt',
    title: 'Fleet Management',
    heroHeadline: 'Track Every Vehicle, Control Every Cost',
    heroSubheadline: 'A custom fleet management system that tracks vehicle locations, schedules maintenance, controls fuel spend, and gives you the driver behaviour data that reduces accidents and saves on insurance.',
    problemPoints: [
      'You don\'t know where your vehicles are unless you call the driver — which means you can\'t give customers accurate ETAs.',
      'Maintenance happens reactively — vehicles break down because service reminders get missed, costing you 10x what planned maintenance would have.',
      'Fuel expenses are impossible to audit — drivers submit paper receipts that take a week to reconcile and are hard to verify.',
    ],
    featureCards: [
      {
        title: 'Live GPS Fleet Tracking',
        description: 'Real-time location of every vehicle on a map. Customer ETAs calculated automatically from live position and traffic data.',
        metric: 'Zero "where is the truck?" calls',
      },
      {
        title: 'Predictive Maintenance Scheduling',
        description: 'Service reminders triggered by mileage, engine hours, or time intervals. Maintenance scheduled before breakdown — not after.',
      },
      {
        title: 'Fuel Card & Expense Integration',
        description: 'Fuel spend captured at point of sale, matched to vehicle and trip automatically. Anomalies flagged without anyone reviewing receipts.',
      },
      {
        title: 'Driver Behaviour Analytics',
        description: 'Speeding, harsh braking, and idle time tracked per driver. Safety scores used for coaching and insurance premium negotiations.',
      },
    ],
    industriesServed: ['logistics', 'manufacturing', 'retail'],
    relatedServices: ['software-development', 'ai-agent-development'],
    ctaHeadline: 'Ready to Control Your Fleet Like a Professional Logistics Operator?',
  },
  {
    slug: 'vacation-rental',
    title: 'Airbnb & Vacation Rental Management',
    heroHeadline: 'Manage 10 Properties Like You\'re Managing 1',
    heroSubheadline: 'A custom vacation rental management platform that automates guest communication, syncs availability across Airbnb and Booking.com, and coordinates housekeeping — so you scale without adding headcount.',
    problemPoints: [
      'Guest messages arrive from Airbnb, Booking.com, and WhatsApp — you\'re constantly switching apps and missing urgent requests.',
      'Double-bookings happen because you\'re updating calendars on each platform separately and one always gets out of sync.',
      'Housekeeping coordination between checkout and the next guest\'s check-in is a logistical headache that causes delays and complaints.',
    ],
    featureCards: [
      {
        title: 'Unified Guest Communication',
        description: 'All messages from every booking platform in one inbox. Automated responses to common questions sent instantly — even at 2am.',
        metric: 'Response time under 5 minutes',
      },
      {
        title: 'Multi-Platform Calendar Sync',
        description: 'Block a date on one platform and it blocks everywhere instantly. Double-bookings become structurally impossible.',
      },
      {
        title: 'Automated Housekeeping Scheduling',
        description: 'Checkout triggers a cleaning task automatically. Housekeeping gets a mobile notification with the property, the checklist, and the next check-in time.',
      },
      {
        title: 'Dynamic Pricing Engine',
        description: 'Rates adjust automatically based on demand, seasonality, and competitor pricing. You earn more per booking without manual rate management.',
      },
    ],
    industriesServed: ['hospitality', 'retail'],
    relatedServices: ['software-development', 'ai-agent-development'],
    ctaHeadline: 'Ready to Scale Your Rental Portfolio Without Scaling Your Workload?',
  },
  {
    slug: 'hr-mgmt',
    title: 'HR Management',
    heroHeadline: 'HR That Runs on Processes, Not Post-it Notes',
    heroSubheadline: 'A custom HR management system that handles onboarding, attendance, leave management, payroll inputs, and performance reviews — without spreadsheets, paper forms, or WhatsApp groups.',
    problemPoints: [
      'Onboarding a new employee takes your HR team two weeks of form collection, email follow-up, and system setup — by which time the hire is already frustrated.',
      'Leave balances live in a spreadsheet that nobody trusts — HR spends hours every month reconciling conflicts.',
      'Performance reviews happen once a year because the process is too painful to run more frequently — giving you no real data on who\'s performing.',
    ],
    featureCards: [
      {
        title: 'Digital Onboarding Workflows',
        description: 'New hires complete paperwork, upload documents, and access training — all digitally before their first day. IT access provisioned automatically.',
        metric: '80% faster onboarding',
      },
      {
        title: 'Attendance & Leave Management',
        description: 'Mobile clock-in/out, leave requests approved via app, and leave balances updated in real time — no spreadsheet reconciliation required.',
      },
      {
        title: 'Payroll Input Automation',
        description: 'Attendance, overtime, and leave data feeds directly into your payroll calculation — reducing manual data entry and payroll errors.',
      },
      {
        title: 'Continuous Performance Tracking',
        description: 'Quarterly goals set, check-ins logged, and performance scores calculated continuously — so annual reviews summarise a year of data, not a manager\'s recent memory.',
      },
    ],
    industriesServed: ['manufacturing', 'retail', 'professional-services', 'hospitality'],
    relatedServices: ['software-development', 'salesforce-development'],
    ctaHeadline: 'Ready to Run HR Like a System, Not a Firefight?',
  },
  {
    slug: 'lead-mgmt',
    title: 'Lead Management',
    heroHeadline: 'Stop Losing Leads to Poor Follow-Up',
    heroSubheadline: 'A custom lead management system that captures every enquiry, assigns it to the right person, triggers follow-up sequences, and tells you which source is producing your best customers.',
    problemPoints: [
      'Leads come in from your website, Instagram, IndiaMart, and WhatsApp — and they all land in different places with no system to track them.',
      'Follow-up is inconsistent — hot leads go cold because the rep was busy and there was no automatic reminder.',
      'You don\'t know which marketing channel is generating quality leads — you\'re spending budget based on volume, not conversion.',
    ],
    featureCards: [
      {
        title: 'Omnichannel Lead Capture',
        description: 'Every lead from every source — website forms, social media, IndiaMart, WhatsApp, and phone — captured in one system automatically.',
        metric: 'Zero leads fall through the cracks',
      },
      {
        title: 'Automated Follow-Up Sequences',
        description: 'New lead gets an instant WhatsApp acknowledgment, a call reminder at hour 2, and an email nurture sequence — automatically.',
      },
      {
        title: 'Lead Source Attribution',
        description: 'Every converted customer traced back to the exact source and campaign. Know which ₹1,000 of ad spend produces a customer.',
      },
      {
        title: 'Pipeline & Conversion Reporting',
        description: 'Stage-by-stage conversion rates, time-in-stage, and rep performance visible at a glance. Know where leads are dying and fix it.',
      },
    ],
    industriesServed: ['retail', 'professional-services', 'manufacturing', 'finance'],
    relatedServices: ['salesforce-development', 'software-development', 'ai-agent-development'],
    ctaHeadline: 'Ready to Turn Your Lead Flow Into a Predictable Pipeline?',
  },
  {
    slug: 'sales-mgmt',
    title: 'Sales Management',
    heroHeadline: 'Sales Targets Your Team Can Actually Hit — With Visibility to Prove It',
    heroSubheadline: 'A custom sales management platform that tracks quotas, monitors rep activity, forecasts revenue, and gives managers the real-time data they need to coach the team, not just report to the board.',
    problemPoints: [
      'Your sales forecast is built from what reps say in Monday meetings — and it\'s wrong 70% of the time.',
      'Managers have no visibility into rep activity day-to-day — by the time they see the numbers, the month is already lost.',
      'Quota setting is based on last year plus a guess — there\'s no data model behind the number, so it\'s either demoralising or too easy.',
    ],
    featureCards: [
      {
        title: 'Real-Time Revenue Forecasting',
        description: 'Pipeline weighted by stage probability plus historical close rates. A forecast your CFO can present to the board.',
        metric: 'Forecast accuracy above 85%',
      },
      {
        title: 'Rep Activity Tracking',
        description: 'Calls made, meetings booked, proposals sent — tracked daily per rep. Managers coach with data, not impressions.',
      },
      {
        title: 'Quota & Territory Management',
        description: 'Quotas assigned by rep, territory, or product line. Progress tracked in real time so reps always know where they stand.',
      },
      {
        title: 'Deal Win/Loss Analysis',
        description: 'Every closed-lost deal tagged with a reason. Patterns surface automatically — and inform product, pricing, and sales process changes.',
      },
    ],
    industriesServed: ['professional-services', 'manufacturing', 'retail', 'finance'],
    relatedServices: ['salesforce-development', 'software-development'],
    ctaHeadline: 'Ready for a Sales Operation That Runs on Data?',
  },
  {
    slug: 'crm',
    title: 'CRM Solution',
    heroHeadline: 'Every Customer Relationship Managed in One Place',
    heroSubheadline: 'A custom CRM that centralises your customer data, automates touchpoints, and gives every team member — sales, support, and accounts — a single view of every customer relationship.',
    problemPoints: [
      'Customer data is spread across email, spreadsheets, WhatsApp chats, and three different tools — no one has the full picture.',
      'New team members can\'t get up to speed on a client relationship because the history is in a colleague\'s inbox or memory.',
      'There\'s no systematic way to identify upsell opportunities — your best customers don\'t get any more attention than your smallest ones.',
    ],
    featureCards: [
      {
        title: '360° Customer Profile',
        description: 'Every interaction — calls, emails, meetings, purchases, support tickets — in one timeline per customer. Any team member can pick up any relationship.',
        metric: 'Complete customer history, always',
      },
      {
        title: 'Automated Customer Touchpoints',
        description: 'Birthday messages, renewal reminders, post-purchase check-ins — triggered automatically based on your relationship rules.',
      },
      {
        title: 'Upsell & Retention Scoring',
        description: 'Customers scored on engagement, purchase frequency, and contract renewal probability. Focus your attention where the revenue is.',
      },
      {
        title: 'Customer Health Monitoring',
        description: 'Alerts when a customer\'s engagement drops below threshold — before they churn, not after.',
      },
    ],
    industriesServed: ['professional-services', 'retail', 'finance', 'manufacturing'],
    relatedServices: ['salesforce-development', 'software-development', 'ai-agent-development'],
    ctaHeadline: 'Ready for a CRM That Actually Manages Customer Relationships?',
  },
  {
    slug: 'india-mart',
    title: 'IndiaMart Automation',
    heroHeadline: 'Turn IndiaMart Leads Into Customers — Automatically',
    heroSubheadline: 'Stop manually copying IndiaMart enquiries into your CRM. A custom automation that captures every lead, scores it, sends an instant WhatsApp response, and routes it to your sales team — in under 60 seconds.',
    problemPoints: [
      'IndiaMart leads come in at all hours — and by the time your team responds in the morning, the buyer has already contacted three competitors.',
      'Your sales team manually copies IndiaMart enquiries into a spreadsheet — an hour of admin work every day that adds zero value.',
      'You have no visibility into which IndiaMart leads convert and which are junk — so you treat them all the same.',
    ],
    featureCards: [
      {
        title: 'Instant Lead Capture & Routing',
        description: 'Every IndiaMart enquiry captured via API and routed to the right sales rep within 60 seconds — automatically assigned by product category or territory.',
        metric: 'Response in under 60 seconds',
      },
      {
        title: 'Automated WhatsApp Response',
        description: 'Every enquiry gets an instant WhatsApp message with your product details and a booking link — while your team sleeps, you\'re already engaging.',
      },
      {
        title: 'Lead Qualification Scoring',
        description: 'Enquiries scored by buyer intent, location, and order size signals. Reps focus on the top 20% that convert 80% of the revenue.',
      },
      {
        title: 'IndiaMart-to-CRM Sync',
        description: 'All enquiries, responses, and outcomes synced to your CRM automatically. Full lead history without a single manual entry.',
      },
    ],
    industriesServed: ['manufacturing', 'retail'],
    relatedServices: ['ai-agent-development', 'salesforce-development', 'software-development'],
    ctaHeadline: 'Ready to Respond to Every IndiaMart Lead in Under a Minute?',
  },
  {
    slug: 'erp',
    title: 'ERP Solution',
    heroHeadline: 'One System for Your Entire Business',
    heroSubheadline: 'A custom ERP that unifies your finance, inventory, procurement, sales, and HR into one live system — built for how your business actually runs, not how a generic template assumes it should.',
    problemPoints: [
      'Every department uses a different tool — and integrating them is an ongoing manual process that consumes your operations team\'s time.',
      'Month-end close requires pulling data from four systems and reconciling discrepancies that nobody can explain.',
      'Off-the-shelf ERP like SAP Business One costs more in annual licensing than it saves — and the implementation takes two years.',
    ],
    featureCards: [
      {
        title: 'Unified Business Platform',
        description: 'Finance, inventory, procurement, sales, and HR in one system. Data entered once flows across every module — no reconciliation needed.',
        metric: 'One version of the truth',
      },
      {
        title: 'Module-by-Module Implementation',
        description: 'We build and deliver one module at a time so you see value every 6-8 weeks — not after a 12-month implementation.',
      },
      {
        title: 'Custom Workflow & Approval Engine',
        description: 'Your specific approval chains, exception rules, and business logic encoded exactly — not a generic workaround.',
      },
      {
        title: 'Real-Time Business Intelligence',
        description: 'Executive dashboard with KPIs across every function — from inventory turns to DSO to employee utilisation — updated live.',
      },
    ],
    industriesServed: ['manufacturing', 'retail', 'logistics', 'hospitality'],
    relatedServices: ['software-development', 'ai-agent-development'],
    ctaHeadline: 'Ready to Run Your Business on One System?',
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing & Production Management',
    heroHeadline: 'Production Floor Visibility That Prevents Delays Before They Happen',
    heroSubheadline: 'A custom manufacturing management system that tracks production orders, monitors machine utilisation, manages quality checkpoints, and alerts you to capacity bottlenecks in real time — before they delay a customer delivery.',
    problemPoints: [
      'You don\'t know actual production capacity until you count physical WIP on the floor — by which time it\'s too late to re-sequence.',
      'Quality defects are caught at the end of the production run — when the cost of rework is highest and delivery is already at risk.',
      'Raw material availability is tracked separately from production scheduling — the result is machine downtime waiting for material that should have been ordered a week ago.',
    ],
    featureCards: [
      {
        title: 'Real-Time Production Order Tracking',
        description: 'Every work order status visible live — from raw material release to finished goods. Production managers see the floor without walking it.',
        metric: 'Zero production surprises',
      },
      {
        title: 'Capacity Planning & Scheduling',
        description: 'Machine capacity, shift schedules, and order priorities fed into an optimised production schedule. Bottlenecks surfaced before they delay shipments.',
      },
      {
        title: 'In-Process Quality Control',
        description: 'Quality checkpoints enforced at each production stage. Defects caught and logged at origin — not at final inspection.',
      },
      {
        title: 'Material Requirements Planning',
        description: 'Finished goods targets drive automatic raw material requirements. Procurement triggered before stock runs out — not after machines stop.',
      },
    ],
    industriesServed: ['manufacturing'],
    relatedServices: ['software-development', 'ai-agent-development'],
    ctaHeadline: 'Ready to Run Your Production Floor on Real Data?',
  },
]
