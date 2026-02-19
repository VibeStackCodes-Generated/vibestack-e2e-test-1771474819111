import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useMutation } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const ping = useMutation({ mutationFn: async () => supabase.auth.getSession() })

  const { data: rows = [] } = useQuery({
    queryKey: ['recipes', 'featured'],
    queryFn: async () => {
      if (true) {
        const { data, error } = await supabase.from('recipes').select('*').limit(6)
        if (error) throw error
        return data ?? []
      }
      return []
    },
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="min-h-screen ">
        <header className="border-b py-5 text-center"><h2 className="text-2xl font-semibold font-[family-name:var(--font-display)]">PublicRecipeBook</h2><div className="mt-2 flex justify-center gap-6 text-sm"><Link to="/">Home</Link><Link to="/recipes/">Recipes</Link><Link to="/recipe-ingredients/">Recipe Ingredients</Link><Link to="/recipe-tags/">Recipe Tags</Link><Link to="/recipe-tag-links/">Recipe Tag Links</Link></div></header>
        <main className="">
          <section className="mx-auto max-w-4xl p-6 gap-6 py-20 text-center animate-in fade-in duration-300"><h1 className="text-5xl md:text-7xl font-semibold">Find your next favorite recipe—no sign-in required.</h1><p className="mt-4 text-muted-foreground">Search, filter, and browse public recipes with ingredients and tags in seconds.</p><div className="mt-8 flex justify-center"><Link to="/recipes/"><Button className="transition-all duration-200">Browse recipes</Button></Link></div><p className="mt-4 text-xs text-muted-foreground">Photo: Anshu A</p></section>
          <section className="mx-auto max-w-6xl p-6 gap-6 py-12">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Featured Recipes</h2>
              <Button variant="outline" size="sm" className="transition-all duration-200" onClick={() => ping.mutate()}>Refresh</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rows.map((row: Record<string, unknown>) => (
                <Card key={String(row.id)} className="rounded-[0.5rem] border border-border shadow-sm transition-all duration-200 hover:scale-[1.02] overflow-hidden">
                  {row.image_url ? <img src={String(row.image_url)} alt={String(row.title ?? '')} className="h-40 w-full object-cover" /> : <img src={`https://picsum.photos/seed/recipes-${String(row.id).slice(0,8)}/400/300`} alt="" className="h-40 w-full object-cover" />}
                  <CardHeader>
                    <CardTitle>
                      <Link to={"/recipes/" + String(row.id)} className="hover:underline">
                        {String(row.title ?? 'Untitled')}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1"><p className="text-sm text-muted-foreground">{String(row.description ?? '—')}</p><p className="text-sm text-muted-foreground">{String(row.instructions ?? '—')}</p><p className="text-sm text-muted-foreground">{String(row.prep_time_minutes ?? '—')}</p></CardContent>
                </Card>
              ))}
            </div>
            {rows.length === 0 && <p className="text-sm text-muted-foreground">No recipes yet—add the first recipe to start the collection.</p>}
          </section>
          <footer className="border-t py-8 text-center text-sm text-muted-foreground">Cook something wonderful today.</footer>
        </main>
      </div>
    </div>
  )
}
