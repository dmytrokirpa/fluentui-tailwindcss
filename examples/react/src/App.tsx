import * as React from "react";
import {
  Card,
  CardHeader,
  CardPreview,
  Text,
  Button,
  Badge,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  TableColumnDefinition,
  createTableColumn,
  NavItem,
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  tokens,
  NavDrawer,
  NavDrawerHeader,
  NavDrawerBody,
  Hamburger,
  AppItem,
  useRestoreFocusTarget,
  Select,
} from "@fluentui/react-components";
import {
  DataTrending24Regular,
  People24Regular,
  Eye24Regular,
  Calendar24Regular,
  Globe24Regular,
  ChevronUp24Regular,
  ChevronDown24Regular,
  Home24Regular,
} from "@fluentui/react-icons";
import {
  AreaChart,
  VerticalBarChart,
  ChartProps,
  VerticalBarChartDataPoint,
} from "@fluentui/react-charts";

interface TableItem {
  pageTitle: string;
  status: string;
  users: number;
  eventCount: number;
  viewsPerUser: number;
  averageTime: string;
  dailyConversions: number;
  productTree: string;
}

const tableData: TableItem[] = [
  {
    pageTitle: "Homepage Overview",
    status: "Online",
    users: 23423,
    eventCount: 8345,
    viewsPerUser: 18.3,
    averageTime: "2m 14s",
    dailyConversions: 4.2,
    productTree: "Website",
  },
  {
    pageTitle: "Product Details - Gadgets",
    status: "Online",
    users: 17240,
    eventCount: 5953,
    viewsPerUser: 8.7,
    averageTime: "2m 30s",
    dailyConversions: 3.8,
    productTree: "Home",
  },
  {
    pageTitle: "Checkout Process - Step 1",
    status: "Offline",
    users: 58246,
    eventCount: 3456,
    viewsPerUser: 15.2,
    averageTime: "2m 55s",
    dailyConversions: 2.9,
    productTree: "Pricing",
  },
  {
    pageTitle: "User Profile Dashboard",
    status: "Online",
    users: 86246,
    eventCount: 12434,
    viewsPerUser: 7.4,
    averageTime: "2m 40s",
    dailyConversions: 3.1,
    productTree: "About us",
  },
  {
    pageTitle: "Article Listing - Tech News",
    status: "Online",
    users: 14246,
    eventCount: 3553,
    viewsPerUser: 3.1,
    averageTime: "2m 55s",
    dailyConversions: 2.7,
    productTree: "Blog",
  },
];

const columns: TableColumnDefinition<TableItem>[] = [
  createTableColumn<TableItem>({
    columnId: "pageTitle",
    compare: (a, b) => a.pageTitle.localeCompare(b.pageTitle),
    renderHeaderCell: () => "Page Title",
    renderCell: (item) => item.pageTitle,
  }),
  createTableColumn<TableItem>({
    columnId: "status",
    compare: (a, b) => a.status.localeCompare(b.status),
    renderHeaderCell: () => "Status",
    renderCell: (item) => (
      <Badge
        appearance={item.status === "Online" ? "filled" : "outline"}
        color={item.status === "Online" ? "success" : "danger"}
      >
        {item.status}
      </Badge>
    ),
  }),
  createTableColumn<TableItem>({
    columnId: "users",
    compare: (a, b) => a.users - b.users,
    renderHeaderCell: () => "Users",
    renderCell: (item) => item.users.toLocaleString(),
  }),
  createTableColumn<TableItem>({
    columnId: "eventCount",
    compare: (a, b) => a.eventCount - b.eventCount,
    renderHeaderCell: () => "Event Count",
    renderCell: (item) => item.eventCount.toLocaleString(),
  }),
  createTableColumn<TableItem>({
    columnId: "viewsPerUser",
    compare: (a, b) => a.viewsPerUser - b.viewsPerUser,
    renderHeaderCell: () => "Views per User",
    renderCell: (item) => item.viewsPerUser.toString(),
  }),
  createTableColumn<TableItem>({
    columnId: "averageTime",
    compare: (a, b) => a.averageTime.localeCompare(b.averageTime),
    renderHeaderCell: () => "Average Time",
    renderCell: (item) => item.averageTime,
  }),
  createTableColumn<TableItem>({
    columnId: "dailyConversions",
    compare: (a, b) => a.dailyConversions - b.dailyConversions,
    renderHeaderCell: () => "Daily Conversions",
    renderCell: (item) => `${item.dailyConversions}%`,
  }),
  createTableColumn<TableItem>({
    columnId: "productTree",
    compare: (a, b) => a.productTree.localeCompare(b.productTree),
    renderHeaderCell: () => "Product tree",
    renderCell: (item) => item.productTree,
  }),
];

// Chart data for Sessions Area Chart
const sessionsData: ChartProps = {
  chartTitle: "Sessions Over Time",
  lineChartData: [
    {
      legend: "Sessions",
      data: [
        { x: new Date("2023-03-01"), y: 8500 },
        { x: new Date("2023-03-05"), y: 9200 },
        { x: new Date("2023-03-10"), y: 10800 },
        { x: new Date("2023-03-15"), y: 11500 },
        { x: new Date("2023-03-20"), y: 13277 },
        { x: new Date("2023-03-25"), y: 12800 },
        { x: new Date("2023-03-30"), y: 14200 },
        { x: new Date("2023-04-01"), y: 13900 },
        { x: new Date("2023-04-05"), y: 15100 },
        { x: new Date("2023-04-10"), y: 14800 },
        { x: new Date("2023-04-15"), y: 16200 },
        { x: new Date("2023-04-17"), y: 13277 },
      ],
      color: tokens.colorBrandBackground,
    },
  ],
};

// Chart data for Page Views Bar Chart
const pageViewsData: VerticalBarChartDataPoint[] = [
  {
    x: "Oct",
    y: 980000,
    legend: "October",
    color: tokens.colorPaletteBlueForeground2,
  },
  {
    x: "Nov",
    y: 1100000,
    legend: "November",
    color: tokens.colorPaletteBlueForeground2,
  },
  {
    x: "Dec",
    y: 1250000,
    legend: "December",
    color: tokens.colorPaletteBlueForeground2,
  },
  {
    x: "Jan",
    y: 1150000,
    legend: "January",
    color: tokens.colorPaletteBlueForeground2,
  },
  {
    x: "Feb",
    y: 1300000,
    legend: "February",
    color: tokens.colorPaletteBlueForeground2,
  },
  {
    x: "Mar",
    y: 1280000,
    legend: "March",
    color: tokens.colorPaletteBlueForeground2,
  },
];

const countryData = [
  { name: "India", percentage: 59, flag: "🇮🇳" },
  { name: "USA", percentage: 22, flag: "🇺🇸" },
  { name: "Brazil", percentage: 15, flag: "🇧🇷" },
];

// Available themes
const themes = {
  "web-light": webLightTheme,
  "web-dark": webDarkTheme,
} as const;

type ThemeName = keyof typeof themes;

const AnalyticsDashboard: React.FC = () => {
  const [selectedValue, setSelectedValue] = React.useState("home");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isLargeScreen, setIsLargeScreen] = React.useState(false);
  const [currentTheme, setCurrentTheme] =
    React.useState<ThemeName>("web-light");

  // Detect screen size for responsive drawer
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsLargeScreen(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsLargeScreen(e.matches);
      // On large screens, keep drawer open; on small screens, close overlay drawer when switching
      if (e.matches) {
        setIsDrawerOpen(true); // Keep inline drawer open on large screens
      } else {
        setIsDrawerOpen(false); // Close overlay drawer on small screens when switching
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Initialize drawer state based on screen size
  React.useEffect(() => {
    if (isLargeScreen) {
      setIsDrawerOpen(true); // Open inline drawer on large screens by default
    }
  }, [isLargeScreen]);

  const handleNavItemSelect = (_: unknown, data: { value: string }) => {
    setSelectedValue(data.value);
    // Close overlay drawer on mobile after selection
    if (!isLargeScreen) {
      setIsDrawerOpen(false);
    }
  };

  // Focus restoration hooks for overlay drawer
  const restoreFocusTargetAttributes = useRestoreFocusTarget();

  const handleThemeChange = (_: unknown, data: { value: string }) => {
    setCurrentTheme(data.value as ThemeName);
  };

  return (
    <FluentProvider theme={themes[currentTheme]}>
      <div className="flex flex-col lg:flex-row h-screen">
        {/* NavDrawer - inline on large screens, overlay on small screens */}
        <NavDrawer
          type={isLargeScreen ? "inline" : "overlay"}
          open={isDrawerOpen}
          onOpenChange={(_, { open }) => setIsDrawerOpen(open)}
          selectedValue={selectedValue}
          onNavItemSelect={handleNavItemSelect}
        >
          <NavDrawerHeader>
            <AppItem icon={<Globe24Regular />}>Streamlit-web</AppItem>
          </NavDrawerHeader>
          <NavDrawerBody className="flex flex-col">
            <div className="flex-1">
              <NavItem value="home" icon={<Home24Regular />}>
                Home
              </NavItem>
              <NavItem value="analytics" icon={<DataTrending24Regular />}>
                Analytics
              </NavItem>
              <NavItem value="clients" icon={<People24Regular />}>
                Clients
              </NavItem>
              <NavItem value="tasks" icon={<Calendar24Regular />}>
                Tasks
              </NavItem>
            </div>
            <div className="px-(--spacingHorizontalM) py-(--spacingVerticalM) border-t border-neutral-stroke1">
              <Select
                value={currentTheme}
                onChange={handleThemeChange}
                aria-label="Select theme"
              >
                <option value="web-light">Light Theme</option>
                <option value="web-dark">Dark Theme</option>
              </Select>
            </div>
          </NavDrawerBody>
        </NavDrawer>

        {/* Main content */}
        <main className="flex-1 py-(--spacingVerticalM) sm:py-(--spacingVerticalL) px-(--spacingHorizontalM) sm:px-(--spacingHorizontalL) grow overflow-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-(--spacingVerticalS) mb-(--spacingVerticalM) sm:mb-(--spacingVerticalL)">
            <div className="flex items-center gap-x-(--spacingHorizontalS)">
              <Hamburger
                {...restoreFocusTargetAttributes}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                aria-label="Open navigation"
              />
              <Text
                size={600}
                weight="semibold"
                className="text-base500 sm:text-base600"
              >
                Dashboard
              </Text>
              <Text className="text-base300 sm:text-base400">
                {" "}
                /{" "}
                {selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)}
              </Text>
            </div>
            <div className="flex flex-col sm:flex-row gap-y-(--spacingVerticalXS) sm:gap-y-0 gap-x-(--spacingHorizontalS) items-start sm:items-center">
              <Text className="text-base300 sm:text-base400">Apr 17, 2023</Text>
              <Button appearance="primary" className="w-full sm:w-auto">
                Get insights
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-(--spacingHorizontalM) sm:gap-(--spacingHorizontalL) mb-(--spacingVerticalM) sm:mb-(--spacingVerticalL)">
            <Card className="py-(--spacingVerticalM) shadow-8 border border-neutral-stroke2 bg-neutral-background1 transition-[box-shadow,transform] duration-normal ease-easy-ease hover:shadow-16 hover:-translate-y-0.5">
              <div className="text-base600 sm:text-hero800 font-weight-semibold flex items-center gap-x-(--spacingHorizontalS) mb-(--spacingVerticalXS)">
                <People24Regular />
                14k
              </div>
              <Text className="text-base300 sm:text-base400">Users</Text>
              <div className="flex items-center gap-x-(--spacingHorizontalXS) text-base200 text-palette-green-foreground1">
                <ChevronUp24Regular />
                <Text>+5%</Text>
                <Text className="hidden sm:inline">Last 30 days</Text>
              </div>
            </Card>

            <Card className="py-(--spacingVerticalM) shadow-8 border border-neutral-stroke2 bg-neutral-background1 transition-[box-shadow,transform] duration-normal ease-easy-ease hover:shadow-16 hover:-translate-y-0.5">
              <div className="text-base600 sm:text-hero800 font-weight-semibold flex items-center gap-x-(--spacingHorizontalS) mb-(--spacingVerticalXS)">
                <Eye24Regular />
                325
              </div>
              <Text className="text-base300 sm:text-base400">Conversions</Text>
              <div className="flex items-center gap-x-(--spacingHorizontalXS) text-base200 text-palette-red-foreground1">
                <ChevronDown24Regular />
                <Text>-3%</Text>
                <Text className="hidden sm:inline">Last 30 days</Text>
              </div>
            </Card>

            <Card className="py-(--spacingVerticalM) shadow-8 border border-neutral-stroke2 bg-neutral-background1 transition-[box-shadow,transform] duration-normal ease-easy-ease hover:shadow-16 hover:-translate-y-0.5">
              <div className="text-base600 sm:text-hero800 font-weight-semibold flex items-center gap-x-(--spacingHorizontalS) mb-(--spacingVerticalXS)">
                <DataTrending24Regular />
                200k
              </div>
              <Text className="text-base300 sm:text-base400">Event count</Text>
              <div className="flex items-center gap-x-(--spacingHorizontalXS) text-base200 text-palette-green-foreground1">
                <ChevronUp24Regular />
                <Text>+3%</Text>
                <Text className="hidden sm:inline">Last 30 days</Text>
              </div>
            </Card>

            <Card className="py-(--spacingVerticalM) shadow-8 border border-neutral-stroke2 bg-neutral-background1 transition-[box-shadow,transform] duration-normal ease-easy-ease hover:shadow-16 hover:-translate-y-0.5">
              <CardHeader
                header={
                  <div>
                    <Text
                      weight="semibold"
                      className="text-base400 sm:text-base500"
                    >
                      Explore your data
                    </Text>
                    <Text className="text-base300 sm:text-base400">
                      Uncover performance and visitor insights with our data
                    </Text>
                  </div>
                }
              />
              <Button appearance="primary" className="w-full sm:w-auto">
                Get insights
              </Button>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-(--spacingHorizontalM) sm:gap-(--spacingHorizontalL) mb-(--spacingVerticalM) sm:mb-(--spacingVerticalL)">
            <Card className="py-(--spacingVerticalM) shadow-8 border border-neutral-stroke2 bg-neutral-background1 transition-shadow duration-normal ease-easy-ease hover:shadow-16">
              <CardHeader
                header={
                  <div>
                    <Text
                      weight="semibold"
                      className="text-base400 sm:text-base500"
                    >
                      Sessions
                    </Text>
                    <div className="text-base600 sm:text-hero800 font-weight-semibold flex flex-wrap items-center gap-x-(--spacingHorizontalS) mb-(--spacingVerticalXS)">
                      13,277
                      <div className="flex items-center gap-x-(--spacingHorizontalXS) text-base200 text-palette-green-foreground1">
                        <ChevronUp24Regular />
                        <Text>+4%</Text>
                      </div>
                    </div>
                    <Text className="text-base300 sm:text-base400">
                      Sessions over time for the last 30 days
                    </Text>
                  </div>
                }
              />
              <CardPreview className="overflow-x-auto">
                <AreaChart
                  data={sessionsData}
                  height={300}
                  width={600}
                  enableReflow={true}
                  className="min-w-full"
                />
              </CardPreview>
            </Card>

            <Card className="py-(--spacingVerticalM) shadow-8 border border-neutral-stroke2 bg-neutral-background1 transition-shadow duration-normal ease-easy-ease hover:shadow-16">
              <CardHeader
                header={
                  <div>
                    <Text
                      weight="semibold"
                      className="text-base400 sm:text-base500"
                    >
                      Page views and downloads
                    </Text>
                    <div className="text-base600 sm:text-hero800 font-weight-semibold flex flex-wrap items-center gap-x-(--spacingHorizontalS) mb-(--spacingVerticalXS)">
                      1.3M
                      <div className="flex items-center gap-x-(--spacingHorizontalXS) text-base200 text-palette-red-foreground1">
                        <ChevronDown24Regular />
                        <Text>-6%</Text>
                      </div>
                    </div>
                    <Text className="text-base300 sm:text-base400">
                      Page views and downloads for the last 6 months
                    </Text>
                  </div>
                }
              />
              <CardPreview className="overflow-x-auto">
                <VerticalBarChart
                  data={pageViewsData}
                  height={200}
                  width={400}
                  barWidth={40}
                  yAxisTickCount={5}
                  enableReflow={true}
                  chartTitle="Page Views by Month"
                  legendProps={{
                    allowFocusOnLegends: true,
                  }}
                  className="min-w-full"
                />
              </CardPreview>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-(--spacingHorizontalM) sm:gap-(--spacingHorizontalL)">
            <Card className="py-(--spacingVerticalM) shadow-8 border border-neutral-stroke2 bg-neutral-background1 transition-shadow duration-normal ease-easy-ease hover:shadow-16">
              <CardHeader
                header={
                  <Text
                    weight="semibold"
                    className="text-base400 sm:text-base500"
                  >
                    Details
                  </Text>
                }
              />
              <DataGrid
                items={tableData}
                columns={columns}
                sortable
                getRowId={(item) => item.pageTitle}
              >
                <DataGridHeader>
                  <DataGridRow>
                    {({ renderHeaderCell }) => (
                      <DataGridHeaderCell>
                        {renderHeaderCell()}
                      </DataGridHeaderCell>
                    )}
                  </DataGridRow>
                </DataGridHeader>
                <DataGridBody<TableItem>>
                  {({ item, rowId }) => (
                    <DataGridRow<TableItem> key={rowId}>
                      {({ renderCell }) => (
                        <DataGridCell>{renderCell(item)}</DataGridCell>
                      )}
                    </DataGridRow>
                  )}
                </DataGridBody>
              </DataGrid>
            </Card>

            <div className="flex flex-col gap-y-(--spacingVerticalM)">
              <Card className="py-(--spacingVerticalM) shadow-8 border border-neutral-stroke2 bg-neutral-background1 transition-shadow duration-normal ease-easy-ease hover:shadow-16">
                <CardHeader
                  header={
                    <Text
                      weight="semibold"
                      className="text-base400 sm:text-base500"
                    >
                      Users by country
                    </Text>
                  }
                />
                <div className="flex flex-col gap-y-(--spacingVerticalS)">
                  {countryData.map((country) => (
                    <div
                      key={country.name}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-(--spacingVerticalXS) py-(--spacingVerticalXS)"
                    >
                      <div className="flex items-center gap-x-(--spacingHorizontalS)">
                        <span className="w-5 h-[15px] bg-neutral-background3 rounded-small flex items-center justify-center text-base200">
                          {country.flag}
                        </span>
                        <Text className="text-base300 sm:text-base400">
                          {country.name}
                        </Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full sm:w-15 h-1 bg-neutral-background3 rounded-small overflow-hidden flex-1 sm:flex-none">
                          <div
                            className="h-full bg-brand-background transition-[width] duration-gentle ease-easy-ease"
                            style={{ width: `${country.percentage}%` }}
                          />
                        </div>
                        <Text className="text-base300 sm:text-base400 font-weight-medium">
                          {country.percentage}%
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </FluentProvider>
  );
};

export default AnalyticsDashboard;
