const plotColor1 = 'rgb(177,119,190)';
const plotColor2 = 'rgb(90,155,212)';
const plotColor3 = 'rgb(241,90,113)';
const plotColor4 = 'rgb(151,195,102)';
const plotColor5 = 'rgb(250,169,91)';
const plotColor6 = 'rgb(226,212,64)';

const palette = {
  defaultCol: '#FFFFFF',
  actionCol: '#00ADA8',
  positiveCol: '#92BF17',
  warningCol: '#D69B24',
  negativeCol: '#EC3A65',
  infoCol: '#B36ABB',
  complementCol: '#F7F7F9',
  contrastCol: '#4A4E4E',
  lightTextCol: '#F3F3F3',
  darkTextCol: '#3D3D3D',
  disabledCol: '#FAFAFA',
  disabledTextCol: '#939393',
  dividerCol: '#D0D0D0',
};

export default {
  plotColor1,
  plotColor2,
  plotColor3,
  plotColor4,
  plotColor5,
  plotColor6,
  plotColors: [
    plotColor1,
    plotColor2,
    plotColor3,
    plotColor4,
    plotColor5,
    plotColor6,
  ],
  palette,
  plot: {
    ambientCol: plotColor6,
    axisLineCol: palette.dividerCol,
    axisTitleTextCol: palette.darkTextCol,
    coldCol: plotColor2,
    colors: [
      plotColor1,
      plotColor2,
      plotColor3,
      plotColor4,
      plotColor5,
      plotColor6,
    ],
    darkTextCol: palette.darkTextCol,
    lightTextCol: palette.lightTextCol,
    labelBackgroundCol: palette.complementCol,
    gridLineCol: palette.disabledCol,
    labelBorderCol: palette.disabledCol,
    labelBoxShadow: '1px 1px 1px rgba(0, 0, 0, 0.25)',
    labelHeaderBackgroundCol: palette.complementCol,
    labelHeaderBorderCol: palette.dividerCol,
    labelKeyTextCol: palette.darkTextCol,
    labelTextCol: palette.darkTextCol,
    negativeCol: plotColor3,
    pieSegmentTextCol: palette.lightTextCol,
    positiveCol: plotColor4,
    tickLineCol: palette.dividerCol,
    tickTextCol: palette.darkTextCol,
    tickTextSize: '10px',
    warmCol: plotColor5,
    warningCol: plotColor6,
  },
  paginator: {
    arrowButton: 'n-a',
    defaultButton: 'hx-complement',
    selectedButton: 'hx-action',
  },
};
