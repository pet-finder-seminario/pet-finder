export const getTitle = (mode, type) => {
  let prefix = '';
  switch (mode) {
    case 'new':
    case 'edit':
      prefix = type === 'lost' ? '¿Se te perdió tu mascota? 😢' : '¿Encontraste una mascota de otra persona en la calle? 🐕';
      return `${prefix} No te preocupes. Cargá los datos para que otras personas vean el aviso.`;
    case 'view':
      return type === 'lost' ? '¡Se perdió! ¿Lo viste en algún lado?' : 'Se busca dueño de mascota perdida';
    default:
      return '';
  }
};
