# Klíčové části FE a jejich autoři

Klíčové části FE společně s jejich autory jsou uvedeny v podkapitolách.
Obecně jsou všechny zdrojové soubory spjaté s jednotlivými částmi umístěny
v adresáři `FE/src`.
V tom se dále nacházejí adresáře `routes`, `stores` a `lib`.

Adresář `routes` slouží k organizaci souborů, které reprezentují jednotlivé stránky nebo části aplikace, kdy adresářová struktura odpovídá jednotlivým routám.

Adresář `stores` obsahuje tzv. stores (mechanismus frameworku Svelte)
které jsou v Svelte klíčovým mechanismem pro správu a sdílení stavu v aplikaci.

Adresář `lib` obsahuje komponenty využívané v jednotlivých částech FE a pomocné funkce.



## Úvodní stránka modulů a správa modulů
- **Popis**: Tato část zahrnuje přístup k učebním lekcím a učebním pomůckám v rámci dané lekce a tvorba a správa jednotlivých lekcí.
- **Autor**: Růžička Vojtěch (xruzic56)
- **Umístění v adresářové struktuře:**



## Učební pomůcka kvíz
- **Popis**: Tato část zahrnuje tvorbu uživatelského rozhraní pro plnění kvízu a uživatelského rozhraní pro správu kvízu učitelem.
- **Autor**: Kantor Jiří (xkanto16)
- **Umístění v adresářové struktuře:**
  - hlavní stránce aplikace pro plnění kvízu odpovídá soubor
`FE/src/routes/module/[routeModuleId]/quiz/[routeQuizId]/+page.svelte`, který využívá dvě komponenty `QuizQuestion` a `QuizEvaluation` umístěné v `FE/src/lib/components/quiz`
  - hlavní stránce aplikace pro správu kvízu učitelem odpovídá soubor `FE/src/routes/teacher/module/[routeModuleId]/quiz/[routeQuizId]/+page.svelte`, který využívá komponenty `QuestionList` a `QuestionDetail` umístěné v `FE/src/lib/components/quiz`
  - store sloužící pro správu a přepínání komponent je umístěn v souboru `FE/src/stores/Quiz/userView.ts`

## Učební pomůcka flashcards
- **Popis**: Tato část zahrnuje tvorbu uživatelského rozhraní pro plnění flashcards a uživatelského rozhraní pro správu flashcards učitelem.
- **Autor**: Klímová Lucie (xklimo04)
- **Umístění v adresářové struktuře:**
  - Uživatelskému rozhraní pro plnění daného cvičení z pozice studenta odpovídá
`FE\src\routes\module\[routeModuleId]\flashcards\[routeFlashcardId]\+page.svelte`, využívá komponenty `FlashcardQuestion` a ta je umístěna v adresáři `FE/src/lib/components/flashcards`
  - Uživatelskému rozhraní pro zobrazení výsledků cvičení z pozice studenta odpovídá
`FE\src\routes\module\[routeModuleId]\flashcards\results\+page.svelte`


  - Uživatelskému rozhraní pro správu daného cvičení z pozice učitele odpovídá
`FE\src\routes\teacher\module\[routeModuleId]\flashcards\[routeFlashcardExerciseId]\+page.svelte`, využívá komponenty `Feedback` a `QuestionList`, které jsou umístěny v adresáři `FE/src/lib/components/flashcards`

Další použité komponenty `Progressbar` a `Spinner` jsou umístěny v adresáři `FE/src/lib/components`




## Učební pomůcka čtení s porozuměním
- **Popis**: Tato část zahrnuje tvorbu uživatelského rozhraní pro plnění čtení s porozuměním a uživatelského rozhraní pro správu čtení s porozuměním učitelem.
- **Autor**: Pánek Jan (xpanek11)
- **Umístění v adresářové struktuře:**
    - stránka webové aplikace pro plnění čtení s porozuměním odpovídá `FE/src/routes/module/[routeModuleId]/reading/[routeReadingId]/+page.svelte` a využívá komponenty
     `Editor`, `ReadingQuestion`, `ReadingEvaluation`, `ReadingEvaluationDetail` umístěné v adresáři `FE/src/lib/components/reading`
    - stránka webové aplikace pro správu čtení s porozumněním odpovídá 
    `FE/src/routes/teacher/module/[routeModuleId]/reading/[routeReadingId]/+page.svelte` a využívá komponenty 
    `Editor`,
    `QuestionList`,
    `QuestionDetail` umístěné v adresáři `FE/src/lib/components/reading`
    - stores pro správu a sdílení stavu komponent jsou umístěny v adresáři 
    `FE/src/stores/Reading`
