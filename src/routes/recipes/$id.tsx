import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/recipes/$id')({
  component: RecipeDetailPage,
})

function RecipeDetailPage() {
  const { id } = Route.useParams()

  const { data: row, isPending, error } = useQuery({
    queryKey: ['recipes', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('recipes').select('*').eq('id', id).single()
      if (error) throw error
      return data as Record<string, unknown>
    },
  })

  if (isPending) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-destructive">{error.message}</div>
  if (!row) return <div className="p-8">Not found</div>

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="min-h-screen ">
        <header className="border-b py-5 text-center"><h2 className="text-2xl font-semibold font-[family-name:var(--font-display)]">PublicRecipeBook</h2><div className="mt-2 flex justify-center gap-6 text-sm"><Link to="/">Home</Link><Link to="/recipes/">Recipes</Link><Link to="/recipe-ingredients/">Recipe Ingredients</Link><Link to="/recipe-tags/">Recipe Tags</Link><Link to="/recipe-tag-links/">Recipe Tag Links</Link></div></header>
        <main className="">
          <div className="p-6 gap-6 mx-auto max-w-4xl py-12 space-y-6">
            {Boolean(row.image_url) && <img src={String(row.image_url)} alt={String(row.title ?? '')} className="w-full max-h-96 object-cover rounded-[var(--radius)]" />}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold font-[family-name:var(--font-display)]">{String(row.title ?? 'Recipe')}</h1>
              <Link to="/recipes/"><Button variant="outline" className="transition-all duration-200">Back to Recipes</Button></Link>
            </div>
            <Card className="rounded-[0.5rem] border border-border shadow-sm transition-all duration-200 hover:scale-[1.02]"><CardHeader><CardTitle>Details</CardTitle></CardHeader><CardContent><dl>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Title</dt>
                <dd className="text-sm mt-1">{String(row.title ?? '—')}</dd>
              </div>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Description</dt>
                <dd className="text-sm mt-1">{String(row.description ?? '—')}</dd>
              </div>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Instructions</dt>
                <dd className="text-sm mt-1">{String(row.instructions ?? '—')}</dd>
              </div>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Difficulty</dt>
                <dd className="text-sm mt-1">{String(row.difficulty ?? '—')}</dd>
              </div>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Image Url</dt>
                <dd className="text-sm mt-1">{String(row.image_url ?? '—')}</dd>
              </div>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Source Url</dt>
                <dd className="text-sm mt-1">{String(row.source_url ?? '—')}</dd>
              </div></dl></CardContent></Card><Card className="rounded-[0.5rem] border border-border shadow-sm transition-all duration-200 hover:scale-[1.02]"><CardHeader><CardTitle>Properties</CardTitle></CardHeader><CardContent><dl>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Prep Time Minutes</dt>
                <dd className="text-sm mt-1">{String(row.prep_time_minutes ?? '—')}</dd>
              </div>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Cook Time Minutes</dt>
                <dd className="text-sm mt-1">{String(row.cook_time_minutes ?? '—')}</dd>
              </div>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Servings</dt>
                <dd className="text-sm mt-1">{String(row.servings ?? '—')}</dd>
              </div>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Is Published</dt>
                <dd className="text-sm mt-1">{row.is_published ? 'Yes' : 'No'}</dd>
              </div></dl></CardContent></Card>
          </div>
        </main>
      </div>
    </div>
  )
}
