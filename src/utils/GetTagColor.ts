export const getTagColorClass = (typeName: string) => {
  switch (typeName) {
    case 'normal':
      return 'is-light';
    case 'ground':
      return 'is-black';
    case 'rock':
      return 'is-dark';
    case 'ice':
      return 'is-info';
    case 'dark':
      return 'is-black';
    case 'fairy':
      return 'is-success is-light';
    case 'dragon':
      return 'is-danger';
    case 'psychic':
      return 'is-danger is-light';
    case 'electric':
      return 'is-link is-light';
    case 'steel':
      return 'is-info is-light';
    case 'ghost':
      return 'is-link is-light';
    case 'fighting':
      return 'is-info is-light';
    case 'fire':
      return 'is-danger';
    case 'water':
      return 'is-link';
    case 'flying':
      return 'is-info';
    case 'grass':
      return 'is-success';
    case 'bug':
      return 'is-warning';
    case 'poison':
      return 'is-dark';
    default:
      return 'is-light';
  }
};
