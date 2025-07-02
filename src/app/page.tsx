"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type Ingredient = {
  name: string;
  quantity: string;
};

export default function Home() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", quantity: "" }]);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const submitMix = async () => {
    // Validate inputs
    if (!name.trim()) {
      toast.error("Please enter a mix name");
      return;
    }

    const validIngredients = ingredients.filter(
      (ing) => ing.name.trim() && ing.quantity.trim()
    );

    if (validIngredients.length === 0) {
      toast.error("Please add at least one ingredient");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/mix', {
        method: 'POST',
        body: JSON.stringify({ 
          name: name.trim(),
          ingredients: validIngredients 
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast.success("Mix added successfully!", {
        description: `${validIngredients.length} ingredients added`,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });

      // Reset form
      setName("");
      setIngredients([{ name: "", quantity: "" }]);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to add mix", {
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-24 px-4">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Feed Nutrient AI Tool</h1>
        <Button onClick={() => setOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
          + Add Mix Manually
        </Button>
      </header>

      <section className="text-gray-700 max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">Welcome to the Feed Nutrient AI Reporting Tool</h2>
        <p>
          Upload or manually add feed ingredients to generate nutritional reports powered by AI.
        </p>
      </section>

      <Dialog open={open} onClose={() => !isSubmitting && setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full">
            <Dialog.Title className="text-lg font-bold mb-4">Manual Add Mixing</Dialog.Title>
            
            <Input 
              placeholder="Mix Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="mb-4"
              disabled={isSubmitting}
            />

            <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <Input 
                      placeholder="Ingredient" 
                      value={ing.name} 
                      onChange={(e) => {
                        const newIngs = [...ingredients];
                        newIngs[idx].name = e.target.value;
                        setIngredients(newIngs);
                      }}
                      disabled={isSubmitting}
                    />
                    <Input 
                      placeholder="Quantity" 
                      value={ing.quantity} 
                      onChange={(e) => {
                        const newIngs = [...ingredients];
                        newIngs[idx].quantity = e.target.value;
                        setIngredients(newIngs);
                      }}
                      disabled={isSubmitting}
                    />
                  </div>
                  {ingredients.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeIngredient(idx)}
                      disabled={isSubmitting}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              onClick={addIngredient} 
              className="mb-4 w-full"
              disabled={isSubmitting}
            >
              + Add Ingredient
            </Button>

            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                onClick={submitMix} 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : "Submit"}
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}