import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface ThemeSelectorProps {
  setTheme: (theme: string) => void
}

export default function ThemeSelector({ setTheme }: ThemeSelectorProps) {
  const themes = ['github', 'monokai', 'solarizedlight', 'tomorrow']

  return (
    <Select onValueChange={setTheme}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme) => (
          <SelectItem key={theme} value={theme}>
            {theme}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

