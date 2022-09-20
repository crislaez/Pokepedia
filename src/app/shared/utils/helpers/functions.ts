import { IonContent } from "@ionic/angular";
import { Pokemon } from "@newPokeData/shared/pokemon";

export const trackById = (_: number, item: any): number => {
  return item?.id ?? item?.name ?? item ;
}

export const errorImage = (event): void => {
  event.target.src = '../../../../assets/images/image_not_found.png';
}

export const emptyObject = (object: any): boolean => {
  return Object.keys(object || {})?.length > 0 ? true : false
}

export const getObjectKeys = (obj: any): any => {
  return Object.keys(obj || {})
}

export const gotToTop = (content: IonContent): void => {
  content?.scrollToTop(500);
}

export const sliceSmallText = (text: string) => {
  return text?.length > 7 ? text?.slice(0, 7) + '...' : text;
}

export const sliceText = (text: string) => {
  return text?.length > 17 ? text?.slice(0, 17) + '...' : text;
}

export const sliceLongText = (text: string) => {
  return text?.length > 25 ? text?.slice(0, 25) + '...' : text;
}

export const getPrincipalImage = (url: string): string => {
  const pokemonId = getPokemonPokedexNumber(url);
  return pokemonId ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png` : '';
}

export const getPokemonId = (url: string): string => {
  return url?.split('/')[6] || '';
}

export const getPokedexNumber = (url: string): string => {
  return  url?.split('/')[6] || '';
}

export const clearName = (name: string): string => {
  if(name === null) return '';
  return name?.replace(/-/g, " ")?.replace(/_/g, " ") || name;
}

export const getClassColorType = (pokemon: Pokemon): string => {
  const [ types = null ] = pokemon?.types || [];
  const { type = null } = types || {};
  const { name = null } = type || {};
  return name;
}

export const getPokemonPokedexNumber = (url: string): string => {
  return url?.split('/')?.[6] || '';
}

export const getPokemonImage = (pokemon: Pokemon): string => {
  return pokemon?.sprites?.other?.['official-artwork']?.front_default
}

export const getCardrBackground = (index: number): string => {
  const lasNumber = index?.toString()?.slice(-1);
  if (lasNumber.includes('0')) return 'grass'
  if (lasNumber.includes('1')) return 'water'
  if (lasNumber.includes('2')) return 'rock'
  if (lasNumber.includes('3')) return 'electric'
  if (lasNumber.includes('4')) return 'fire'
  if (lasNumber.includes('5')) return 'ground'
  if (lasNumber.includes('6')) return 'ghost'
  if (lasNumber.includes('7')) return 'normal'
  if (lasNumber.includes('8')) return 'ice'
  if (lasNumber.includes('9')) return 'fairy'
}

export const getClassColor = (name: string): string => {
  if(!name) return ''
  if(name.toLowerCase() === 'grass') return 'grass'
  if(name.toLowerCase() === 'water') return 'water'
  if(name.toLowerCase() === 'bug') return 'bug'
  if(name.toLowerCase() === 'dark') return 'dark'
  if(name.toLowerCase() === 'dragon') return 'dragon'
  if(name.toLowerCase() === 'electric') return 'electric'
  if(name.toLowerCase() === 'fire') return 'fire'
  if(name.toLowerCase() === 'fighting') return 'fighting'
  if(name.toLowerCase() === 'fly' || name.toLowerCase() === 'flying') return 'flying'
  if(name.toLowerCase() === 'ghost') return 'ghost'
  if(name.toLowerCase() === 'ground') return 'ground'
  if(name.toLowerCase() === 'ice') return 'ice'
  if(name.toLowerCase() === 'normal') return 'normal'
  if(name.toLowerCase() === 'poison') return 'poison'
  if(name.toLowerCase() === 'rock') return 'rock'
  if(name.toLowerCase() === 'steel') return 'steel'
  if(name.toLowerCase() === 'psychic') return 'psychic'
  if(name.toLowerCase() === 'fairy') return 'fairy'
}
// export const getSliderConfig = (info:any = []): SwiperOptions => {
//   return {
//     slidesPerView: info?.length > 1 ? 2 : 1,
//     spaceBetween: 20,
//     effect: 'slide',
//     freeMode: true,
//     lazy: true,
//     speed: 600,
//     shortSwipes:true,
//     preloadImages: false
//   };
// }
