export const getCardColor = (hardCount: number): string => {
    if (hardCount >= 5) {
      return 'bg-red-300';
    } else if (hardCount >= 1) {
      return 'bg-yellow-300';
    } else {
      return 'bg-green-300';
    }
  };