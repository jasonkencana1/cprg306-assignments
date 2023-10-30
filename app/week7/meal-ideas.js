import React, {useState, useEffect} from "react";


export default function MealIdeas({ingredient}) {
        // Define a state variable for meals using the useState hook  
        const[meals, setMeals] = useState([]);
        const [loading, setLoading] = useState(true);

    // Define a function to fetch meal ideas based on the selected ingredients
    const fetchMealIdeas = async(ingredient) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);

            if (response.ok) {
                const data = await response.json();
                return data.meals
            } else {
                console.error('Failed to fetch meal ideas');
            }
        } catch (error) {
            console.error('Error fetching meal ideas: ', error);
        }
    };

    const loadMealIdeas = async () => {
        try {
            const mealIdeas = await fetchMealIdeas(ingredient);
            if (mealIdeas) {
                setMeals(mealIdeas);
            } else {
                setMeals([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error loading meal ideas: ', error);
        }
    };

    // Use the useEffect hook to fetch meal ideas when the component mounts or when the ingredient prop changes
    useEffect(() => {
        loadMealIdeas();
    }, [ingredient]);    


    return(
        <div>
            <h2>Meal Ideas for {ingredient}</h2>
            {meals.length > 0 ? (
                <ul>
                    {meals.map((meal) => (
                        <li key={meal.idMeal}>{meal.strMeal}</li>
                    ))}
                </ul>
            ) : (
                <p>No meal ideas found for {ingredient}</p>
            )}
        </div>
    );
}
