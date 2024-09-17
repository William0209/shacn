import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Recipe {
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
  id: string;
}

async function getRecipes(): Promise<
  Recipe[]
> {
  const result = await fetch(
    "http://localhost:4000/recipes"
  );

  return result.json();
}

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="w-full max-w-sm mx-auto"
          >
            <CardHeader>
              <CardTitle className="text-xl">
                {recipe.title}
              </CardTitle>
              <CardDescription>
                {recipe.time} minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-4">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
              </div>
              <CardDescription className="line-clamp-3">
                {recipe.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  recipe.vegan
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {recipe.vegan
                  ? "Vegan"
                  : "Not vegan"}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
