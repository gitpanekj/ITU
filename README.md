# Klíčové části FE a jejich autoři

Klíčové části FE společně s jejich autory jsou uvedeny v podkapitolách.
Obecně jsou všechny zdrojové soubory spjaté s jednotlivými částmi umístěny
v adresáři `FE/src`.
V tom se dále nacházejí adresáře `routes`, `stores` a `lib`.

Adresář `routes` slouží k organizaci souborů, které reprezentují jednotlivé stránky nebo části aplikace, kdy adresářová struktura odpovídá jednotlivým routám.

Adresář `stores` obsahuje tzv. stores (mechanismus frameworku Svelte)
teré jsou v Svelte klíčovým mechanismem pro správu a sdílení stavu v aplikaci.

Adresář `lib` obsahuje komponenty využívané v jednotlivých částech FE a pomocné funkce.



## Úvodní stránka modulů a správa modulů
- **Popis**: Tato část zahrnuje přístup k učebním lekcím a učebním pomůckám v rámci dané lekce a tvorba a správa jednotlivých lekcí.
- **Autor**: Růžička Vojtěch (xruzic56)
- **Umístění v adresářové struktuře:**



## Učební pomůcka kvíz
- **Popis**: Tato část zahrnuje tvorbu uživatelského rozhraní pro plnění kvízu a uživatelského rozhrnaí pro správu kvízu učitelem.
- **Autor**: Kantor Jiří (xkanto16)
- **Umístění v adresářové struktuře:**


## Učební pomůcka flashcards
- **Popis**: Tato část zahrnuje tvorbu uživatelského rozhraní pro plnění flashcards a uživatelského rozhrnaí pro správu flashcards učitelem.
- **Autor**: Klímová Lucie (xklimo04)
- **Umístění v adresářové struktuře:**


## Učební pomůcka čtení s porozuměním
- **Popis**: Tato část zahrnuje tvorbu uživatelského rozhraní pro plnění čtení s porozuměním a uživatelského rozhrnaí pro správu čtení s porozuměním učitelem.
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
