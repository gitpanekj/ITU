// Filename: cardColors.ts
// Author: Lucie Klímová
// Login: xklimo04
// Last Modified: [06-12-2024]
// Description: Defines a card color logic

// Function to get the card color based on its hard count
// Returns the color string that can be used in tailwind code
export const getCardColor = (hardCount: number): string => {
    if (hardCount >= 5) {
      return 'bg-red-300';
    } else if (hardCount >= 1) {
      return 'bg-yellow-300';
    } else {
      return 'bg-green-300';
    }
  };