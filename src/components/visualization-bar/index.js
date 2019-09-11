import { select, div } from 'utils/selection';
import { animate } from 'utils/animate';
import { mergeDefined, defined } from 'utils/utils';
import { EventEmitter } from 'utils/event-emitter';
import {
  VisualizationBarTypes, VisualizationBarParts, VisualizationBarSizes,
  generateGroup, VisualizationBarSizesList, VisualizationBarTypesList,
} from './lib';

const moreThan = target => value => (value < target ? target : value);
const lessThan = target => value => (value > target ? target : value);
const adaptNumber = target => value => moreThan(target)(lessThan(0)(value));

export class VisualizationBar extends EventEmitter {
  constructor(selector, options) {
    super();
    this.options = mergeDefined({
      value: 0,
      secondary: false,
      max: undefined,
      buffer: 0,
      valid: true,
      content: '',
      disabled: false,
      withPercent: false,
      progressLabel: '',
      bufferLabel: '',
      balanceLabel: '',
      withMax: true,
      size: VisualizationBarSizes.STANDARD,
    }, options);

    this.percents = {
      [VisualizationBarTypes.PROGRESS]: 0,
      [VisualizationBarTypes.BUFFER]: 0,
      [VisualizationBarTypes.BALANCE]: 100,
    };

    this.oldPercents = mergeDefined({}, this.percents);

    this.selection = select(selector)
      .classed('hx-visualization-bar', true)
      .classed('hx-visualization-bar-secondary', this.options.secondary);

    this.header = div('hx-visualization-bar-header');
    this.titleElement = div('hx-header-small');
    this.countElement = div('hx-header-small');

    this.body = div('hx-visualization-bar-body hx-animate');
    this.fillWrapper = div('hx-visualization-bar-fill-wrapper');

    this.mainElements = {
      [VisualizationBarTypes.PROGRESS]:
        generateGroup(VisualizationBarTypes[VisualizationBarTypes.PROGRESS]),
      [VisualizationBarTypes.BUFFER]:
        generateGroup(VisualizationBarTypes[VisualizationBarTypes.BUFFER]),
      [VisualizationBarTypes.BALANCE]:
        generateGroup(VisualizationBarTypes[VisualizationBarTypes.BALANCE]),
    };

    this.progressElementsMap = this.mainElements[VisualizationBarTypes.PROGRESS];
    this.bufferElementsMap = this.mainElements[VisualizationBarTypes.BUFFER];
    this.balanceElementsMap = this.mainElements[VisualizationBarTypes.BALANCE];

    this.contentElement = div('hx-visualization-bar-content');

    this.selection.add(div('hx-visualization-bar-title').add(this.titleElement));
    this.selection.add(div('hx-visualization-bar-count').add(this.countElement));
    this.selection.add(this.body);
    this.body.add(this.fillWrapper);

    this.initFill();
    this.initLabels();

    this.selection.add(this.contentElement);
    this.selection.api('visualization-bar', this).api(this);

    this.title(this.options.title);
    this.progress(this.options.value);
    this.buffer(this.options.buffer);
    this.content(this.options.content);
    this.disabled(this.options.disabled);
    this.valid(this.options.valid);
    this.listen();

    this.updateLabel(VisualizationBarTypes.PROGRESS, this.options.progressLabel);
    this.updateLabel(VisualizationBarTypes.BUFFER, this.options.bufferLabel);
    this.updateLabel(VisualizationBarTypes.BALANCE, this.options.balanceLabel);

    this.update();

    this.size(this.options.size);
  }

  /**
    * Get/Set of title property
    * @param {string} value
    */
  title(value) {
    if (defined(value)) {
      this.titleElement.text(this.options.title = value);
    }
    return this.options.title;
  }

  /**
    * Get/Set of progress property
    * @param {number} value
    */
  progress(value) {
    if (defined(value)) {
      this.options.value = moreThan(0)(value);
      if (!this.isSize(VisualizationBarSizes.SMALL)) {
        this.progressElementsMap.get(VisualizationBarParts.PROGRESS).text(value || '');
      }
      this.update();
    }
    return this.options.value;
  }

  /**
    * Get/Set of buffer property
    * @param {number} value
    */
  buffer(value) {
    if (defined(value)) {
      this.options.buffer = moreThan(0)(value);
      if (!this.isSize(VisualizationBarSizes.SMALL)) {
        this.bufferElementsMap.get(VisualizationBarParts.PROGRESS).text(value || '');
      }
      this.update();
    }
    return this.options.buffer;
  }

  /**
    * Get/Set max
    * @param {number} value
    */
  max(value) {
    if (defined(value)) {
      this.options.max = value;
      this.progress(this.options.value);
      this.buffer(this.options.buffer);
    }
    return this.options.max ? this.options.max : this.options.value + this.options.buffer;
  }

  /**
    * Get/Set of content property
    * @param {string} value
    */
  content(value) {
    if (defined(value)) {
      this.contentElement.text(value);
      return value;
    }
    return this.options.content;
  }

  /**
    * Setter of invalid property
    * @param {boolean} value
    */
  invalid(value) {
    if (defined(value)) {
      return this.valid(!value);
    }
    throw new Error('You should pass value to set property!');
  }

  /**
    * Get/Set of valid property
    * @param {boolean} value
    */
  valid(value) {
    if (defined(value)) {
      this.options.valid = Boolean(value);
      this.selection.classed('error', !this.options.valid);
    }
    return this.options.valid;
  }

  /**
    * Get/Set of disabled property
    * @param {boolean} value
    */
  disabled(value) {
    if (defined(value)) {
      this.options.disabled = Boolean(value);
      this.selection.classed('disabled', this.options.disabled);
    }
    return this.options.disabled;
  }


  /**
    * Get/Set of size property
    * @param {VisualizationBarSizes} value
    */
  size(value) {
    if (defined(value)) {
      if (!defined(VisualizationBarSizes[value])) {
        throw new Error('You should choose one of types from VisualizationBarSizes enum');
      }
      this.options.size = value;
      VisualizationBarSizesList.forEach(type => this.selection.classed(`hx-${VisualizationBarSizes[type]}`, false));
      this.selection.classed(`hx-${VisualizationBarSizes[value]}`, true);
    }

    return this.options.size;
  }

  isSize(size) {
    return this.size() === size;
  }

  listen() {
    this.on('visibility', ({ type, value }) => {
      this.mainElements[type].get(VisualizationBarParts.WRAPPER).classed('hx-hidden', !value);
      this.body.classed(`hx-without-${VisualizationBarTypes[type]}`, !value);
    });
  }

  disable() {
    this.disabled(true);
  }

  enable() {
    this.disabled(false);
    this.update();
  }

  error() {
    this.invalid(true);
  }

  updateLabel(type, value) {
    if (this.disabled() || this.isSize(VisualizationBarSizes.SMALL)) {
      return;
    }
    if (!defined(VisualizationBarTypes[type])) {
      throw new Error('You should choose one of types from VisualizationBarTypes enum');
    }

    this.mainElements[type].get(VisualizationBarParts.LABEL_TEXT).classed('hx-hidden', !defined(value) || !value);
    this.mainElements[type].get(VisualizationBarParts.LABEL_TEXT).text(this.percents[type] ? value : '');
  }

  initFill() {
    this.fillWrapper.add(
      this.progressElementsMap.get(VisualizationBarParts.WRAPPER).add(
        this.progressElementsMap.get(VisualizationBarParts.FILL)
          .add(this.progressElementsMap.get(VisualizationBarParts.PROGRESS)),
      ),
    ).add(
      this.bufferElementsMap.get(VisualizationBarParts.WRAPPER).add(
        this.bufferElementsMap.get(VisualizationBarParts.FILL)
          .add(this.bufferElementsMap.get(VisualizationBarParts.PROGRESS)),
      ),
    ).add(
      this.balanceElementsMap.get(VisualizationBarParts.WRAPPER).add(
        this.balanceElementsMap.get(VisualizationBarParts.FILL).classed('inversed-text-color', true)
          .add(this.balanceElementsMap.get(VisualizationBarParts.PROGRESS)),
      ),
    );
  }

  initLabels() {
    this.progressElementsMap.get(VisualizationBarParts.WRAPPER)
      .add(this.progressElementsMap.get(VisualizationBarParts.LABEL)
        .add(div('hx-visualization-bar-label-text-wrapper').add(this.progressElementsMap.get(VisualizationBarParts.LABEL_TEXT)))
        .add(this.progressElementsMap.get(VisualizationBarParts.LABEL_PERCENT)));
    this.bufferElementsMap.get(VisualizationBarParts.WRAPPER).add(
      this.bufferElementsMap.get(VisualizationBarParts.LABEL)
        .add(div('hx-visualization-bar-label-text-wrapper').add(this.bufferElementsMap.get(VisualizationBarParts.LABEL_TEXT)))
        .add(this.bufferElementsMap.get(VisualizationBarParts.LABEL_PERCENT)),
    );
    this.balanceElementsMap.get(VisualizationBarParts.WRAPPER).add(
      this.balanceElementsMap.get(VisualizationBarParts.LABEL)
        .add(div('hx-visualization-bar-label-text-wrapper').add(this.balanceElementsMap.get(VisualizationBarParts.LABEL_TEXT)))
        .add(this.balanceElementsMap.get(VisualizationBarParts.LABEL_PERCENT)),
    );

    this.checkLabels();
  }

  checkLabels() {
    const showLabels = !this.options.progressLabel
      && !this.options.bufferLabel
      && !this.options.balanceLabel
      && !this.options.withPercent;
    this.selection.classed('hx-without-label', showLabels);
  }

  update() {
    if (this.disabled()) {
      return;
    }
    const currentMax = this.max();
    this.updatePercents(currentMax);
    this.updateBalance(currentMax);
    this.updateLabelPercent(VisualizationBarTypesList);
    this.updateFill(VisualizationBarTypesList);
    this.updateCount();
  }

  updatePercents(currentMax) {
    const { value, buffer, max } = this.options;
    this.oldPercents = mergeDefined({}, this.percents);

    this.percents[VisualizationBarTypes.PROGRESS] = Math.round((value * 100) / currentMax);
    this.percents[VisualizationBarTypes.BUFFER] = Math.round((buffer * 100) / currentMax);
    const totalFillPc = this.percents[VisualizationBarTypes.BUFFER]
      + this.percents[VisualizationBarTypes.PROGRESS];
    this.percents[VisualizationBarTypes.BALANCE] = max ? totalFillPc > 100 ? 0 : Math.round(
      100 - totalFillPc,
    ) : 0;
  }

  updateBalance(currentMax) {
    const { value, buffer } = this.options;
    if (!this.isSize(VisualizationBarSizes.SMALL)) {
      const totalFill = value + buffer;
      const balanceValue = totalFill > currentMax ? 0 : currentMax
        ? currentMax - totalFill
        : Math.max(value, buffer) - Math.min(value, buffer);
      this.mainElements[VisualizationBarTypes.BALANCE].get(VisualizationBarParts.PROGRESS)
        .text(balanceValue || '');
    }
  }

  updateLabelPercent(labelTypes) {
    if (this.disabled() || this.size() === VisualizationBarSizes.SMALL) {
      return;
    }
    labelTypes.forEach((type) => {
      if (!defined(VisualizationBarTypes[type])) {
        throw new Error('You should choose one of types from VisualizationBarTypes enum');
      }

      if (this.options.withPercent) {
        this.mainElements[type].get(VisualizationBarParts.LABEL_PERCENT)
          .text(this.percents[type] ? `(${this.percents[type]}%)` : '');
      }
    });
  }

  updateFill(labelTypes) {
    if (this.disabled()) {
      return;
    }

    labelTypes.forEach((type) => {
      if (!defined(VisualizationBarTypes[type])) {
        throw new Error('You should choose one of types from VisualizationBarTypes enum');
      }
      const element = this.mainElements[type];
      const percent = this.percents[type];
      const oldPercent = this.oldPercents[type];

      const visible = fncPc => this.emit('visibility', {
        type,
        value: fncPc !== 0,
      });

      visible(oldPercent);
      animate(element.get(VisualizationBarParts.WRAPPER).node())
        .style('width', `${oldPercent}%`, `${percent}% `, 250)
        .on('end', () => visible(percent));
    });
  }

  updateCount() {
    const { withMax, value, max, buffer } = this.options;
    this.countElement.text(withMax ? `${value + buffer} / ${max || '-'}` : value);
  }
}

export const visualizationBar = (options) => {
  const selection = div();
  new VisualizationBar(selection.node(), options);
  return selection;
};


export { VisualizationBarTypes, VisualizationBarParts, VisualizationBarSizes };
