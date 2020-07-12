import L                      from "leaflet";

import CUSTOMIZATIONS from     '../constants/Customizations'
import defaultUrls from './default/icons'

const Icon = L.Icon.extend({
  options: {
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [14, 15]
  }
});

const shadowOptions = {
  shadowSize: [34, 48],
  shadowAnchor: [17, 44],
  shadowUrl: defaultUrls.shadowImgUrl,
  shadowRetinaUrl: defaultUrls.shadowRetinaImgUrl
};

const customizations = {
  [CUSTOMIZATIONS.DEFAULT]: defaultUrls,
}

const urls = (type, customization=CUSTOMIZATIONS.DEFAULT) => {
  const {
    companyImgUrl,
    companyRetinaImgUrl,
    initiativeImgUrl,
    initiativeRetinaImgUrl,
    eventImgUrl,
    eventRetinaImgUrl,
    unknownImgUrl,
    unknownRetinaImgUrl,
  } =  customizations[customization]

  switch (type) {
    case 'company':
      return {
        iconUrl: companyImgUrl,
        iconRetinaUrl: companyRetinaImgUrl,
      };
    case 'initiative':
      return {
        iconUrl: initiativeImgUrl,
        iconRetinaUrl: initiativeRetinaImgUrl
      };
    case 'event':
      return {
        iconUrl: eventImgUrl,
        iconRetinaUrl: eventRetinaImgUrl
      };
    default:
      return {
        iconUrl: unknownImgUrl,
        iconRetinaUrl: unknownRetinaImgUrl
      };
  }
}

const create = (opt={}, customization=CUSTOMIZATIONS.DEFAULT) => {
  const NewIcon = opt.shadow ? Icon.extend({ options: shadowOptions }) : Icon;
  const type = typeof opt === 'string' ? opt : opt.category;
  return new NewIcon(urls(type, customization));
};

module.exports = {
  create,
  Icon,
  icons: {
    company    : create('company'),
    initiative : create('initiative'),
    event      : create('event'),
    unknown    : create('unknown')
  }
};
