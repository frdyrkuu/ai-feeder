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

    <div className="max-w-7xl mx-auto pt-24 px-4 space-y-8">
      {/* <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Feed Nutrient AI Tool</h1>
        <Button onClick={() => setOpen(true)} className="bg-green-600 hover:bg-green-700 text-white">
          + Add Mix Manually
        </Button>
      </header> */}

      {/* Hero */}
      <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-4 mx-auto">
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
          <div>
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">Start your journey with <span className="text-green-500">Modern Farming</span></h1>
            <p className="mt-3 text-md text-gray-800 dark:text-neutral-400">A powerful AI-driven solution designed to optimize livestock feed formulations by analyzing ingredient inputs and generating precise nutrient profiles. This tool leverages machine learning to ensure balanced, cost-effective, and efficient feeding strategies — improving animal health, performance, and farm profitability in real time.</p>

            {/* Buttons */}
            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
              <Button size="lg"><a href="">Read Our Documentation</a></Button>
              <Button size="lg" onClick={() => setOpen(true)} className="bg-green-600 hover:bg-green-700 text-white">
                + Add Mix Manually
              </Button>
            </div>
            {/* End Buttons */}


          </div>
          {/* End Col */}

          <div className="relative ms-4">
            <img className="w-auto rounded-md h-[600px] aspect-square object-cover" src="/images/BackYardPigs1.png" alt="Hero Image" data-aos="fade-ease" data-aos-duration="2000" />
            <div className="absolute inset-0 -z-1 bg-linear-to-tr from-gray-200 via-white/0 to-white/0 size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6 dark:from-neutral-800 dark:via-neutral-900/0 dark:to-neutral-900/0"></div>

            {/* SVG*/}
            <div className="absolute bottom-[-1] start-0">
              <svg className="w-2/3 ms-auto h-auto text-white dark:text-neutral-900" width="630" height="451" viewBox="0 0 630 451" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="531" y="352" width="99" height="99" fill="white" />
                <rect x="140" y="352" width="106" height="99" fill="white" />
                <rect x="482" y="402" width="64" height="49" fill="white" />
                <rect x="433" y="402" width="63" height="49" fill="white" />
                <rect x="384" y="352" width="49" height="50" fill="white" />
                <rect x="531" y="328" width="50" height="50" fill="white" />
                <rect x="99" y="303" width="49" height="58" fill="white" />
                <rect x="99" y="352" width="49" height="50" fill="white" />
                <rect x="99" y="392" width="49" height="59" fill="white" />
                <rect x="44" y="402" width="66" height="49" fill="white" />
                <rect x="234" y="402" width="62" height="49" fill="white" />
                <rect x="334" y="303" width="50" height="49" fill="white" />
                <rect x="581" width="49" height="49" fill="white" />
                <rect x="581" width="49" height="64" fill="white" />
                <rect x="482" y="123" width="49" height="49" fill="white" />
                <rect x="507" y="124" width="49" height="24" fill="white" />
                <rect x="531" y="49" width="99" height="99" fill="white" />
              </svg>
            </div>
            {/* End SVG*/}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Hero */}

      {/* Icon Blocks */}
      <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="lg:w-3/4">
            <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white">
              Collaborative tools to design better user experience
            </h2>
            <p className="mt-3 text-gray-800 dark:text-neutral-400">
              We help businesses bring ideas to life in the digital world, by designing and implementing the technology tools that they need to win.
            </p>
            <p className="mt-5">
              <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="#">
                Contact sales to learn more
                <svg className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </a>
            </p>
          </div>
          {/* End Col */}

          <div className="space-y-6 lg:space-y-10">
            {/* Icon Block */}
            <div className="flex gap-x-5 sm:gap-x-8">
              {/* Icon */}
              <span className="shrink-0 inline-flex justify-center items-center size-11 rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
              </span>
              <div className="grow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  Industry-leading documentation
                </h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                  Our documentation and extensive Client libraries contain everything a business needs to build a custom integration in a fraction of the time.
                </p>
              </div>
            </div>
            {/* End Icon Block */}

            {/* Icon Block */}
            <div className="flex gap-x-5 sm:gap-x-8">
              {/* Icon */}
              <span className="shrink-0 inline-flex justify-center items-center size-11 rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" /><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" /></svg>
              </span>
              <div className="grow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  Developer community support
                </h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                  We actively contribute to open-source projects—giving back to the community through development, patches, and sponsorships.
                </p>
              </div>
            </div>
            {/* End Icon Block */}

            {/* Icon Block */}
            <div className="flex gap-x-5 sm:gap-x-8">
              {/* Icon */}
              <span className="shrink-0 inline-flex justify-center items-center size-11 rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" /></svg>
              </span>
              <div className="grow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  Simple and affordable
                </h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                  From boarding passes to movie tickets, there's pretty much nothing you can't store with Preline.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Icon Blocks */}

      {/* Icon Blocks */}
      <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="">
          {/* Grid */}
          <div className="grid gap-12">
            <div>
              <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white">
                Our vision
              </h2>
              <p className="mt-3 text-gray-800 dark:text-neutral-400">
                For as long as there have been cities, the public square has been a fundamental part of the urban landscape - an open, approachable space to meet and engage with friends and neighbours. Space aims to capture this spirit of bringing people together in an exciting, welcoming environment.
              </p>
            </div>

            <div className="space-y-6 lg:space-y-10">
              {/* Icon Block */}
              <div className="flex gap-x-5 sm:gap-x-8">
                <svg className="shrink-0 mt-2 size-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></svg>
                <div className="grow">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                    High quality Co-Living spaces
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-neutral-400">
                    Our fully furnished spaces are designed and purpose-built with Co-Living in mind, featuring high-end finishes and amenities that go far beyond traditional apartment buildings.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}

              {/* Icon Block */}
              <div className="flex gap-x-5 sm:gap-x-8">
                <svg className="shrink-0 mt-2 size-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                <div className="grow">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                    Fostering vibrant communities
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-neutral-400">
                    Our passion is bringing people together. Beyond creating beautiful spaces, we provide shared experiences.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}

              {/* Icon Block */}
              <div className="flex gap-x-5 sm:gap-x-8">
                <svg className="shrink-0 mt-2 size-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" /></svg>
                <div className="grow">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                    Simple and all-inclusive
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-neutral-400">
                    We worry about the details so that our residents don't have to. From our online application process to simple, all-inclusive billing we aim to make the living experience as effortless as possible.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
            </div>
          </div>
          {/* End Grid */}
        </div>
      </div>
      {/* End Icon Blocks */}

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
                className="bg-green-600 hover:bg-green-700 text-white"
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