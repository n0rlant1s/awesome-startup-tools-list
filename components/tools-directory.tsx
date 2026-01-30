"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, ExternalLink } from "lucide-react"

type Tool = {
  name: string
  url: string
  note?: string
}

type Subcategory = {
  name: string
  tools: Tool[]
}

type Category = {
  name: string
  subcategories: Subcategory[]
}

const toolsData: Category[] = [
  {
    name: "Tech",
    subcategories: [
      {
        name: "AI Chat",
        tools: [
          { name: "ChatGPT", url: "https://chatgpt.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "DeepSeek", url: "https://www.deepseek.com" },
          { name: "Google Gemini", url: "https://gemini.google.com" },
          { name: "Microsoft CoPilot", url: "https://copilot.microsoft.com" },
          { name: "Grok", url: "https://grok.com" },
        ],
      },
      {
        name: "Git Repositories",
        tools: [
          { name: "GitHub", url: "https://github.com" },
          { name: "BitBucket", url: "https://bitbucket.com" },
          { name: "GitLab", url: "https://gitlab.com" },
          { name: "Azure Repos", url: "https://azure.microsoft.com/en-us/products/devops/repos" },
          { name: "AWS CodeCommit", url: "https://aws.amazon.com/codecommit/" },
        ],
      },
      {
        name: "Cloud Hosting",
        tools: [
          { name: "Oracle Cloud", url: "https://www.oracle.com/cloud/free/", note: "Free tier" },
          { name: "Amazon AWS", url: "https://aws.amazon.com", note: "Free tier" },
          { name: "Microsoft Azure", url: "https://azure.microsoft.com", note: "Free tier" },
          { name: "Google Cloud", url: "https://cloud.google.com", note: "Free tier" },
          { name: "Digital Ocean", url: "https://digitalocean.com", note: "Free tier" },
          { name: "Vultr", url: "https://vultr.com", note: "Paid" },
          { name: "Heroku", url: "https://www.heroku.com", note: "Paid" },
          { name: "Fly.io", url: "https://fly.io", note: "Paid" },
        ],
      },
      {
        name: "Static Site Hosting",
        tools: [
          { name: "CloudFlare Pages", url: "https://pages.cloudflare.com" },
          { name: "GitHub Pages", url: "https://pages.github.com" },
          { name: "Firebase Hosting", url: "https://firebase.google.com/products/hosting" },
          { name: "Netlify", url: "https://www.netlify.com" },
          { name: "Vercel", url: "https://vercel.com" },
          { name: "Surge", url: "https://surge.sh" },
          { name: "Kinsta", url: "https://kinsta.com/static-site-hosting" },
        ],
      },
      {
        name: "IDEs & Editors",
        tools: [
          { name: "VS Code", url: "https://code.visualstudio.com" },
          { name: "Visual Studio", url: "https://www.visualstudio.com" },
          { name: "Sublime Text", url: "https://www.sublimetext.com" },
          { name: "JetBrains IDEs", url: "https://www.jetbrains.com/ides" },
          { name: "Cursor", url: "https://cursor.com", note: "AI-based" },
          { name: "Windsurf", url: "https://codeium.com/windsurf", note: "AI-based" },
        ],
      },
      {
        name: "Online Development",
        tools: [
          { name: "Firebase Studio", url: "https://firebase.studio", note: "AI-based" },
          { name: "VSCode for Web", url: "https://vscode.dev" },
          { name: "Bolt.new", url: "https://bolt.new", note: "AI-based" },
          { name: "Lovable", url: "https://lovable.dev", note: "AI-based" },
          { name: "Replit", url: "https://replit.com", note: "AI-based" },
          { name: "v0 by Vercel", url: "https://v0.dev", note: "AI-based" },
        ],
      },
      {
        name: "Email Services",
        tools: [
          { name: "Brevo", url: "https://www.brevo.com/" },
          { name: "MailGun", url: "http://www.mailgun.com" },
          { name: "SendGrid", url: "https://sendgrid.com" },
          { name: "MailChimp", url: "https://mailchimp.com" },
          { name: "AWS SES", url: "https://aws.amazon.com/ses/" },
          { name: "Resend", url: "https://resend.com/" },
        ],
      },
      {
        name: "DNS & CDN",
        tools: [
          { name: "CloudFlare", url: "https://www.cloudflare.com/" },
          { name: "ClouDNS", url: "https://cloudns.net/" },
          { name: "Let's Encrypt", url: "https://letsencrypt.org/" },
        ],
      },
    ],
  },
  {
    name: "Business",
    subcategories: [
      {
        name: "CRM",
        tools: [
          { name: "HubSpot CRM", url: "https://www.hubspot.com/products/crm" },
          { name: "Capsule CRM", url: "https://capsulecrm.com" },
          { name: "Insightly", url: "https://www.insightly.com" },
          { name: "Bitrix24", url: "https://www.bitrix24.com/tools/crm/" },
          { name: "Attio", url: "https://attio.com/" },
        ],
      },
      {
        name: "Analytics",
        tools: [
          { name: "Google Analytics", url: "https://analytics.google.com" },
          { name: "New Relic", url: "https://newrelic.com/" },
          { name: "Amplitude", url: "https://amplitude.com/" },
          { name: "Microsoft Clarity", url: "https://clarity.microsoft.com" },
          { name: "PostHog", url: "https://posthog.com/" },
        ],
      },
      {
        name: "Team Chat",
        tools: [
          { name: "Slack", url: "https://slack.com" },
          { name: "Microsoft Teams", url: "https://teams.microsoft.com" },
          { name: "Mattermost", url: "https://mattermost.com" },
          { name: "Rocket.Chat", url: "https://rocket.chat" },
          { name: "Google Chat", url: "https://chat.google.com" },
        ],
      },
      {
        name: "Customer Support",
        tools: [
          { name: "Zendesk Chat", url: "https://www.zopim.com/" },
          { name: "LiveChat", url: "https://www.livechat.com" },
          { name: "Tawk.to", url: "https://www.tawk.to" },
          { name: "WhatsApp Business", url: "https://business.whatsapp.com" },
        ],
      },
      {
        name: "Marketing & Sales",
        tools: [
          { name: "HubSpot", url: "https://www.hubspot.com/" },
          { name: "Buffer", url: "https://buffer.com" },
          { name: "HootSuite", url: "https://hootsuite.com" },
          { name: "BuzzSumo", url: "http://buzzsumo.com/" },
          { name: "AnswerThePublic", url: "https://answerthepublic.com/" },
        ],
      },
    ],
  },
  {
    name: "Productivity",
    subcategories: [
      {
        name: "Note-taking",
        tools: [
          { name: "Notion", url: "https://www.notion.com" },
          { name: "Microsoft OneNote", url: "https://www.onenote.com" },
          { name: "Google Keep", url: "https://keep.google.com" },
          { name: "Obsidian", url: "https://obsidian.md/" },
          { name: "Capacities", url: "https://capacities.io" },
        ],
      },
      {
        name: "Project Management",
        tools: [
          { name: "Jira", url: "https://www.atlassian.com/software/jira" },
          { name: "Asana", url: "https://asana.com" },
          { name: "Trello", url: "https://trello.com" },
          { name: "ClickUp", url: "https://clickup.com" },
          { name: "Basecamp", url: "https://basecamp.com" },
          { name: "Airtable", url: "https://airtable.com" },
        ],
      },
      {
        name: "Time Tracking",
        tools: [
          { name: "Toggl", url: "https://toggl.com" },
          { name: "Clockify", url: "https://clockify.me" },
          { name: "TimeCamp", url: "https://www.timecamp.com" },
          { name: "Everhour", url: "https://everhour.com" },
          { name: "Jibble", url: "https://www.jibble.io" },
        ],
      },
      {
        name: "Storage",
        tools: [
          { name: "Google Drive", url: "https://drive.google.com" },
          { name: "OneDrive", url: "https://onedrive.com" },
          { name: "Dropbox", url: "https://www.dropbox.com" },
          { name: "Mega", url: "https://mega.io" },
          { name: "Proton Drive", url: "https://proton.me/drive" },
        ],
      },
    ],
  },
  {
    name: "Design",
    subcategories: [
      {
        name: "Design Tools",
        tools: [
          { name: "Figma", url: "https://www.figma.com/" },
          { name: "Canva", url: "https://www.canva.com" },
          { name: "Gamma", url: "https://gamma.app", note: "AI-based" },
          { name: "Snappa", url: "https://snappa.com" },
          { name: "Pixlr", url: "https://pixlr.com/" },
        ],
      },
      {
        name: "Stock Photos",
        tools: [
          { name: "Unsplash", url: "https://unsplash.com" },
          { name: "Pexels", url: "https://www.pexels.com" },
          { name: "Shopify Burst", url: "https://burst.shopify.com" },
          { name: "Icons8", url: "https://icons8.com" },
          { name: "Undraw", url: "https://undraw.co/illustrations" },
        ],
      },
      {
        name: "Video Making",
        tools: [
          { name: "Biteable", url: "https://biteable.com" },
          { name: "VEED", url: "https://www.veed.io" },
          { name: "Powtoon", url: "https://www.powtoon.com" },
          { name: "Animoto", url: "http://animoto.com" },
          { name: "Loom", url: "https://www.loom.com" },
        ],
      },
    ],
  },
  {
    name: "Security",
    subcategories: [
      {
        name: "Password Managers",
        tools: [
          { name: "Proton Pass", url: "https://proton.me/pass" },
          { name: "BitWarden", url: "https://bitwarden.com" },
          { name: "Passbolt", url: "https://www.passbolt.com" },
          { name: "Avira PWM", url: "https://passwords.avira.com" },
        ],
      },
      {
        name: "VPN",
        tools: [{ name: "Proton VPN", url: "https://protonvpn.com" }],
      },
    ],
  },
]

export function ToolsDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredData = useMemo(() => {
    return toolsData
      .map((category) => ({
        ...category,
        subcategories: category.subcategories
          .map((subcategory) => ({
            ...subcategory,
            tools: subcategory.tools.filter(
              (tool) =>
                tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                subcategory.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
          }))
          .filter((subcategory) => subcategory.tools.length > 0),
      }))
      .filter((category) => {
        const matchesSearch = category.subcategories.length > 0
        const matchesCategory = selectedCategory === null || category.name === selectedCategory
        return matchesSearch && matchesCategory
      })
  }, [searchQuery, selectedCategory])

  const totalTools = toolsData.reduce(
    (acc, cat) => acc + cat.subcategories.reduce((a, sub) => a + sub.tools.length, 0),
    0
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Startup Tools Directory</h1>
          <p className="text-muted-foreground mb-4">
            A curated collection of {totalTools}+ free and freemium tools for startups
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Badge>
              {toolsData.map((category) => (
                <Badge
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {filteredData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tools found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredData.map((category) => (
              <section key={category.name}>
                <h2 className="text-2xl font-semibold text-foreground mb-6 pb-2 border-b border-border">
                  {category.name}
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.subcategories.map((subcategory) => (
                    <Card key={subcategory.name} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{subcategory.name}</CardTitle>
                        <CardDescription>{subcategory.tools.length} tools</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {subcategory.tools.map((tool) => (
                            <li key={tool.name}>
                              <a
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between text-sm hover:text-primary transition-colors group"
                              >
                                <span className="flex items-center gap-2">
                                  {tool.name}
                                  {tool.note && (
                                    <span className="text-xs text-muted-foreground">({tool.note})</span>
                                  )}
                                </span>
                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-card mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            Curated list of tools for startups. Feel free to contribute on{" "}
            <a
              href="https://github.com/n0rlant1s/awesome-startup-tools-list"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  )
}
