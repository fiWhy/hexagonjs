import chai from 'chai';

import { div } from 'utils/selection';

import { ProgressBar } from 'components/progress-bar';

export default () => {
  chai.should();

  describe('hx-progress-bar', () => {
    it('should create and class the progress bar correctly', () => {
      const pb = new ProgressBar(div());
      pb.selection.classed('hx-progress-bar').should.equal(true);
      pb.selection.selectAll('.hx-progress-bar-inner').size().should.equal(1);
      pb.progress.should.equal(0);
      /*
        This method is used rather than calculate the pixel width as .style('width')
        returns Npx not N%
      */
      pb.innerBars.attr('style').split(' ').join('').should.equal('width:0%;');
    });

    it('should set the progress correctly with value', () => {
      const pb = new ProgressBar(div());
      /*
        This method is used rather than calculate the pixel width as .style('width')
        returns Npx not N%
      */
      pb.innerBars.attr('style').split(' ').join('').should.equal('width:0%;');
      pb.value(0.79);
      pb.progress.should.equal(0.79);
      /*
        This method is used rather than calculate the pixel width as .style('width')
        returns Npx not N%
      */
      pb.innerBars.attr('style').split(' ').join('').should.equal('width:79%;');
    });

    it('should return the correct progress with value', () => {
      const pb = new ProgressBar(div());
      pb.value(0.5);
      pb.progress.should.equal(0.5);
      pb.value().should.equal(0.5);
      pb.value(1);
      pb.progress.should.equal(1);
      pb.value().should.equal(1);
    });

    it('should do nothing if a non-numeric value is passed in to value', () => {
      const pb = new ProgressBar(div());
      pb.value('bob');
      pb.progress.should.equal(0);
      pb.value(0.5);
      pb.progress.should.equal(0.5);
      pb.value('i0');
      pb.progress.should.equal(0.5);
    });

    it('should not apply negative values', () => {
      const pb = new ProgressBar(div());
      pb.value(-0.1);
      pb.progress.should.equal(0);
    });

    return it('should not apply values over 1', () => {
      const pb = new ProgressBar(div());
      pb.value(2);
      pb.progress.should.equal(1);
    });
  });
};
