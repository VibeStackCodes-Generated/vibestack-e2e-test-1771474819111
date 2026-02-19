import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/recipe-ingredients/$id')({
  component: RecipeIngredientDetailPage,
})

function RecipeIngredientDetailPage() {
  const { id } = Route.useParams()

  const { data: row, isPending, error } = useQuery({
    queryKey: ['recipe_ingredients', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('recipe_ingredients').select('*').eq('id', id).single()
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
            
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold font-[family-name:var(--font-display)]">{String(row.name ?? 'Recipe Ingredient')}</h1>
              <Link to="/recipe-ingredients/"><Button variant="outline" className="transition-all duration-200">Back to Recipe Ingredients</Button></Link>
            </div>
            <Card className="rounded-[0.5rem] border border-border shadow-sm transition-all duration-200 hover:scale-[1.02]"><CardHeader><CardTitle>Details</CardTitle></CardHeader><CardContent><dl>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Recipe Id</dt>
                <dd className="text-sm mt-1">{String(row.recipe_id ?? '—')}</dd>
              </div>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Name</dt>
                <dd className="text-sm mt-1">{String(row.name ?? '—')}</dd>
              </div>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Unit</dt>
                <dd className="text-sm mt-1">{String(row.unit ?? '—')}</dd>
              </div>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Notes</dt>
                <dd className="text-sm mt-1">{String(row.notes ?? '—')}</dd>
              </div></dl></CardContent></Card><Card className="rounded-[0.5rem] border border-border shadow-sm transition-all duration-200 hover:scale-[1.02]"><CardHeader><CardTitle>Properties</CardTitle></CardHeader><CardContent><dl>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Quantity</dt>
                <dd className="text-sm mt-1">{String(row.quantity ?? '—')}</dd>
              </div>
              <div className="py-2 border-b last:border-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Sort Order</dt>
                <dd className="text-sm mt-1">{String(row.sort_order ?? '—')}</dd>
              </div></dl></CardContent></Card>
          </div>
        </main>
      </div>
    </div>
  )
}
