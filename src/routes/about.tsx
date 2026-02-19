import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  const ping = useMutation({ mutationFn: async () => supabase.auth.getSession() })
  useQuery({ queryKey: ['about', 'warm'], queryFn: async () => ({ ok: true }) })

  return (
    <div className="p-6 gap-6">
      <Card className="rounded-[0.5rem] border border-border shadow-sm transition-all duration-200 hover:scale-[1.02]">
        <CardHeader>
          <CardTitle className="text-3xl font-[family-name:var(--font-display)]">About PublicRecipeBook</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>PublicRecipeBook is a fast, public recipe browser built for discovery. Explore recipes, scan ingredients, and use tags to narrow down exactly what you want to cook—without creating an account. It’s a clean, searchable collection designed for effortless weeknight planning and inspiration.</p>
          <button className="underline transition-all duration-200" onClick={() => ping.mutate()}>Check session</button>
        </CardContent>
      </Card>
    </div>
  )
}
