export const getTitle = (mode, type) => {
  switch (mode) {
    case 'new':
    case 'edit':
      return type === 'lost' ? '😢 ¿Se te perdió tu mascota?' : '🐕 ¿Encontraste una mascota de otra persona en la calle?';
    case 'view':
      return type === 'lost' ? '¡Se perdió!' : '¡Buscamos a su dueño!';
    default:
      return '';
  }
};

export const getSubtitle = (mode, type) => {
  switch (mode) {
    case 'new':
    case 'edit':
      return 'Cargá los datos para que otras personas vean el aviso.';
    case 'view':
      return type === 'lost' ? '¿Lo viste en algún lado?' : 'Ayudanos a encontrarlo';
    default:
      return '';
  }
};

export const FLYER_TYPE = {
  lost: 1,
  found: 2,
};
