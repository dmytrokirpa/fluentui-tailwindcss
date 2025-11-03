import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardPreview,
  Text,
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
  Title2,
  Title3,
  Body1,
  Body1Strong,
  Caption1,
} from "@fluentui/react-components";
import type { Theme } from "@fluentui/react-components";

type ThemeName = "web-light" | "web-dark" | "teams-light" | "teams-dark";

const themeMap: Record<ThemeName, Theme> = {
  "web-light": webLightTheme,
  "web-dark": webDarkTheme,
  "teams-light": teamsLightTheme,
  "teams-dark": teamsDarkTheme,
};

function App() {
  const [themeName, setThemeName] = useState<ThemeName>("web-light");
  const currentTheme = themeMap[themeName];

  return (
    <FluentProvider theme={currentTheme}>
      <div className="min-h-screen bg-neutral-background1">
        {/* Responsive Header with Navigation */}
        <header className="border-b border-neutral-stroke1 bg-neutral-background2">
          <div className="max-w-[1400px] mx-auto px-(--spacingHorizontalXL) py-(--spacingVerticalM)">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-(--spacingHorizontalM)">
              <div>
                <h1 className="typography-title1">Fluent UI + Tailwind CSS</h1>
                <p className="typography-body1 mt-(--spacingVerticalXS)">
                  Layout examples with Fluent React Components
                </p>
              </div>
              <div className="flex gap-x-(--spacingHorizontalS) flex-wrap">
                <Button
                  size="small"
                  appearance={
                    themeName === "web-light" ? "primary" : "secondary"
                  }
                  onClick={() => setThemeName("web-light")}
                >
                  Light
                </Button>
                <Button
                  size="small"
                  appearance={
                    themeName === "web-dark" ? "primary" : "secondary"
                  }
                  onClick={() => setThemeName("web-dark")}
                >
                  Dark
                </Button>
                <Button
                  size="small"
                  appearance={
                    themeName === "teams-light" ? "primary" : "secondary"
                  }
                  onClick={() => setThemeName("teams-light")}
                >
                  Teams
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-[1400px] mx-auto px-(--spacingHorizontalXL) py-(--spacingVerticalXL)">
          {/* Dashboard-style Stats Grid */}
          <section className="mb-(--spacingVerticalXL)">
            <Title2 className="typography-title2 mb-(--spacingVerticalL)">
              Dashboard Layout - Stats Grid
            </Title2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-(--spacingHorizontalL)">
              <Card className="bg-neutral-card-background border border-neutral-stroke1 rounded-medium shadow-2">
                <CardPreview className="p-(--spacingHorizontalL)">
                  <div className="flex items-start justify-between">
                    <div>
                      <Caption1 className="text-neutral-foreground3">
                        Total Users
                      </Caption1>
                      <Title3 className="typography-title3 mt-(--spacingVerticalXS)">
                        12,345
                      </Title3>
                      <Body1 className="text-status-success-foreground1 mt-(--spacingVerticalXS)">
                        +12.5%
                      </Body1>
                    </div>
                    <div className="w-12 h-12 rounded-medium bg-brand-background flex items-center justify-center">
                      <Text className="text-brand-foreground1">👥</Text>
                    </div>
                  </div>
                </CardPreview>
              </Card>

              <Card className="bg-neutral-card-background border border-neutral-stroke1 rounded-medium shadow-2">
                <CardPreview className="p-(--spacingHorizontalL)">
                  <div className="flex items-start justify-between">
                    <div>
                      <Caption1 className="text-neutral-foreground3">
                        Revenue
                      </Caption1>
                      <Title3 className="typography-title3 mt-(--spacingVerticalXS)">
                        $45.2K
                      </Title3>
                      <Body1 className="text-status-success-foreground1 mt-(--spacingVerticalXS)">
                        +8.2%
                      </Body1>
                    </div>
                    <div className="w-12 h-12 rounded-medium bg-compound-brand-background flex items-center justify-center">
                      <Text className="text-compound-brand-foreground1">
                        💰
                      </Text>
                    </div>
                  </div>
                </CardPreview>
              </Card>

              <Card className="bg-neutral-card-background border border-neutral-stroke1 rounded-medium shadow-2">
                <CardPreview className="p-(--spacingHorizontalL)">
                  <div className="flex items-start justify-between">
                    <div>
                      <Caption1 className="text-neutral-foreground3">
                        Orders
                      </Caption1>
                      <Title3 className="typography-title3 mt-(--spacingVerticalXS)">
                        1,234
                      </Title3>
                      <Body1 className="text-status-warning-foreground1 mt-(--spacingVerticalXS)">
                        -3.1%
                      </Body1>
                    </div>
                    <div className="w-12 h-12 rounded-medium bg-status-warning-background1 flex items-center justify-center">
                      <Text className="text-status-warning-foreground1">
                        📦
                      </Text>
                    </div>
                  </div>
                </CardPreview>
              </Card>

              <Card className="bg-neutral-card-background border border-neutral-stroke1 rounded-medium shadow-2">
                <CardPreview className="p-(--spacingHorizontalL)">
                  <div className="flex items-start justify-between">
                    <div>
                      <Caption1 className="text-neutral-foreground3">
                        Active
                      </Caption1>
                      <Title3 className="typography-title3 mt-(--spacingVerticalXS)">
                        89.2%
                      </Title3>
                      <Body1 className="text-status-success-foreground1 mt-(--spacingVerticalXS)">
                        +2.4%
                      </Body1>
                    </div>
                    <div className="w-12 h-12 rounded-medium bg-status-success-background1 flex items-center justify-center">
                      <Text className="text-status-success-foreground1">✓</Text>
                    </div>
                  </div>
                </CardPreview>
              </Card>
            </div>
          </section>

          {/* Responsive Sidebar + Main Content Layout */}
          <section className="mb-(--spacingVerticalXL)">
            <Title2 className="typography-title2 mb-(--spacingVerticalL)">
              Responsive Sidebar Layout
            </Title2>
            <div className="flex flex-col lg:flex-row gap-(--spacingHorizontalL)">
              {/* Sidebar */}
              <aside className="w-full lg:w-64 flex-shrink-0">
                <Card className="bg-neutral-card-background border border-neutral-stroke1 rounded-medium shadow-4">
                  <CardHeader header={<Text size={600}>Navigation</Text>} />
                  <CardPreview className="p-(--spacingHorizontalS)">
                    <nav className="flex flex-col gap-(--spacingVerticalXS)">
                      <Button appearance="primary" className="justify-start">
                        Dashboard
                      </Button>
                      <Button appearance="subtle" className="justify-start">
                        Analytics
                      </Button>
                      <Button appearance="subtle" className="justify-start">
                        Settings
                      </Button>
                      <Button appearance="subtle" className="justify-start">
                        Reports
                      </Button>
                    </nav>
                  </CardPreview>
                </Card>
              </aside>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <Card className="bg-neutral-card-background border border-neutral-stroke1 rounded-medium shadow-4">
                  <CardHeader
                    header={<Text size={600}>Main Content Area</Text>}
                    description="This layout adapts from stacked on mobile to sidebar + content on desktop"
                  />
                  <CardPreview className="p-(--spacingHorizontalL)">
                    <Body1 className="typography-body1 mb-(--spacingVerticalM)">
                      This demonstrates a responsive sidebar layout using
                      Tailwind's flex utilities. On mobile devices, the sidebar
                      stacks above the main content. On larger screens (lg
                      breakpoint and above), they sit side by side.
                    </Body1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-(--spacingHorizontalM)">
                      <div className="p-(--spacingHorizontalM) rounded-medium bg-neutral-background2">
                        <Body1Strong>Feature 1</Body1Strong>
                        <Caption1 className="mt-(--spacingVerticalXS)">
                          Description of feature one
                        </Caption1>
                      </div>
                      <div className="p-(--spacingHorizontalM) rounded-medium bg-neutral-background2">
                        <Body1Strong>Feature 2</Body1Strong>
                        <Caption1 className="mt-(--spacingVerticalXS)">
                          Description of feature two
                        </Caption1>
                      </div>
                    </div>
                  </CardPreview>
                </Card>
              </div>
            </div>
          </section>

          {/* Card Grid with Varied Sizes */}
          <section className="mb-(--spacingVerticalXL)">
            <Title2 className="typography-title2 mb-(--spacingVerticalL)">
              Responsive Card Grid
            </Title2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-(--spacingHorizontalL)">
              {/* Featured Card - Takes 2 columns on large screens */}
              <Card className="md:col-span-2 lg:col-span-1 bg-neutral-card-background border border-neutral-stroke1 rounded-medium shadow-4">
                <CardPreview className="p-(--spacingHorizontalL)">
                  <div className="aspect-video bg-neutral-background2 rounded-small mb-(--spacingVerticalM) flex items-center justify-center">
                    <Text className="text-neutral-foreground3">
                      Featured Image
                    </Text>
                  </div>
                  <Title3 className="typography-title3 mb-(--spacingVerticalXS)">
                    Featured Article
                  </Title3>
                  <Body1 className="typography-body1 mb-(--spacingVerticalM)">
                    This is a featured card that demonstrates responsive grid
                    layouts with Tailwind CSS. It adapts its width based on the
                    screen size.
                  </Body1>
                  <Button appearance="primary">Read More</Button>
                </CardPreview>
              </Card>

              {/* Regular Cards */}
              {[1, 2, 3, 4].map((num) => (
                <Card
                  key={num}
                  className="bg-neutral-card-background border border-neutral-stroke1 rounded-medium shadow-2"
                >
                  <CardPreview className="p-(--spacingHorizontalL)">
                    <div className="aspect-video bg-neutral-background2 rounded-small mb-(--spacingVerticalM) flex items-center justify-center">
                      <Text className="text-neutral-foreground3">
                        Card {num}
                      </Text>
                    </div>
                    <Body1Strong className="mb-(--spacingVerticalXS)">
                      Card Title {num}
                    </Body1Strong>
                    <Caption1 className="text-neutral-foreground3">
                      Brief description of the card content and its purpose.
                    </Caption1>
                  </CardPreview>
                </Card>
              ))}
            </div>
          </section>

          {/* Flex Layout Examples */}
          <section className="mb-(--spacingVerticalXL)">
            <Title2 className="typography-title2 mb-(--spacingVerticalL)">
              Flexible Layouts
            </Title2>
            <div className="space-y-(--spacingVerticalL)">
              {/* Even Distribution */}
              <Card className="bg-neutral-card-background border border-neutral-stroke1 rounded-medium shadow-2">
                <CardHeader
                  header={<Text size={600}>Even Distribution</Text>}
                />
                <CardPreview className="p-(--spacingHorizontalL)">
                  <div className="flex gap-(--spacingHorizontalM)">
                    {["Left", "Center", "Right"].map((label) => (
                      <div
                        key={label}
                        className="flex-1 p-(--spacingHorizontalM) rounded-small bg-neutral-background2 text-center"
                      >
                        <Body1Strong>{label}</Body1Strong>
                      </div>
                    ))}
                  </div>
                </CardPreview>
              </Card>

              {/* Space Between */}
              <Card className="bg-neutral-card-background border border-neutral-stroke1 rounded-medium shadow-2">
                <CardHeader
                  header={<Text size={600}>Space Between Layout</Text>}
                />
                <CardPreview className="p-(--spacingHorizontalL)">
                  <div className="flex justify-between items-center gap-(--spacingHorizontalM) flex-wrap">
                    <Body1Strong>Left Content</Body1Strong>
                    <div className="flex gap-x-(--spacingHorizontalS)">
                      <Button size="small" appearance="primary">
                        Action
                      </Button>
                      <Button size="small" appearance="secondary">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardPreview>
              </Card>

              {/* Centered with Max Width */}
              <Card className="bg-neutral-card-background border border-neutral-stroke1 rounded-medium shadow-2">
                <CardHeader header={<Text size={600}>Centered Content</Text>} />
                <CardPreview className="p-(--spacingHorizontalL)">
                  <div className="max-w-md mx-auto text-center">
                    <Body1 className="typography-body1">
                      This content is centered with a maximum width constraint,
                      creating a comfortable reading experience on wide screens.
                    </Body1>
                  </div>
                </CardPreview>
              </Card>
            </div>
          </section>

          {/* Form-like Layout */}
          <section className="mb-(--spacingVerticalXL)">
            <Title2 className="typography-title2 mb-(--spacingVerticalL)">
              Form Layout Example
            </Title2>
            <Card className="bg-neutral-card-background border border-neutral-stroke1 rounded-medium shadow-4">
              <CardHeader
                header={<Text size={600}>Contact Form</Text>}
                description="Example of a form layout using Fluent components and Tailwind CSS"
              />
              <CardPreview className="p-(--spacingHorizontalL)">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-(--spacingHorizontalL) mb-(--spacingVerticalM)">
                  <div>
                    <Body1Strong className="mb-(--spacingVerticalXS) block">
                      First Name
                    </Body1Strong>
                    <div className="p-(--spacingHorizontalM) rounded-small border border-neutral-stroke1 bg-neutral-background1">
                      <Text>John</Text>
                    </div>
                  </div>
                  <div>
                    <Body1Strong className="mb-(--spacingVerticalXS) block">
                      Last Name
                    </Body1Strong>
                    <div className="p-(--spacingHorizontalM) rounded-small border border-neutral-stroke1 bg-neutral-background1">
                      <Text>Doe</Text>
                    </div>
                  </div>
                </div>
                <div className="mb-(--spacingVerticalM)">
                  <Body1Strong className="mb-(--spacingVerticalXS) block">
                    Email
                  </Body1Strong>
                  <div className="p-(--spacingHorizontalM) rounded-small border border-neutral-stroke1 bg-neutral-background1">
                    <Text>john.doe@example.com</Text>
                  </div>
                </div>
                <div className="flex gap-x-(--spacingHorizontalS) justify-end">
                  <Button appearance="secondary">Cancel</Button>
                  <Button appearance="primary">Submit</Button>
                </div>
              </CardPreview>
            </Card>
          </section>
        </main>
      </div>
    </FluentProvider>
  );
}

export default App;
