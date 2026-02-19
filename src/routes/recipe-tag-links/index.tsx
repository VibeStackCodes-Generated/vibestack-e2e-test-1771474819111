import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/recipe-tag-links/')({
  component: RecipeTagLinksPage,
})

function RecipeTagLinksPage() {
  const [search, setSearch] = useState('')

  const { data: rows = [], isPending } = useQuery({
    queryKey: ['recipe_tag_links', 'list'],
    queryFn: async () => {
      const { data, error } = await supabase.from('recipe_tag_links').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return data ?? []
    },
  })

  const filtered = search
    ? rows.filter((row: Record<string, unknown>) =>
        String(row.id ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : rows

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="min-h-screen ">
        <header className="border-b py-5 text-center"><h2 className="text-2xl font-semibold font-[family-name:var(--font-display)]">PublicRecipeBook</h2><div className="mt-2 flex justify-center gap-6 text-sm"><Link to="/">Home</Link><Link to="/recipes/">Recipes</Link><Link to="/recipe-ingredients/">Recipe Ingredients</Link><Link to="/recipe-tags/">Recipe Tags</Link><Link to="/recipe-tag-links/">Recipe Tag Links</Link></div></header>
        <main className="">
          <section className="mx-auto max-w-6xl p-6 gap-6 py-12">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-semibold font-[family-name:var(--font-display)]">Recipe Tag Links</h1>
              <Input
                placeholder="Search recipe tag links..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs"
              />
            </div>
            {isPending ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : filtered.length === 0 ? (
              <p className="text-muted-foreground">No recipes yet—add the first recipe to start the collection.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((row: Record<string, unknown>) => (
                  <Link key={String(row.id)} to={"/recipe-tag-links/" + String(row.id)} className="group">
                    <Card className="rounded-[0.5rem] border border-border shadow-sm transition-all duration-200 hover:scale-[1.02] overflow-hidden">
                      <img src={`https://picsum.photos/seed/recipe_tag_links-${String(row.id).slice(0,8)}/400/300`} alt="" className="h-48 w-full object-cover" />
                      <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {String(row.id ?? 'Untitled')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1"><p className="text-sm text-muted-foreground">{String(row.recipe_id ?? '—')}</p>
                        <p className="text-sm text-muted-foreground">{String(row.tag_id ?? '—')}</p></CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
