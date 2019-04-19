import * as React from 'react';
import './AddSong.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Redirect } from 'react-router';
import * as PresentationActions from '../../../data/internal/Actions';
import { Section } from '../../../components/presentations/file-reader';
import v4 = require('uuid/v4');

interface SongSlide {
  id: string;
  body: string;
}

interface AddPassageState {
  modal: boolean;
  goHome: boolean;
  slides: SongSlide[];
}

export default class AddPassage extends React.Component<any, AddPassageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      modal: false,
      goHome: false,
      slides: [],
    };
  }

  async addSlide() {
    this.setState({
      slides: [
        ...this.state.slides,
        {
          id: '',
          body: '',
        },
      ],
    });
  }

  async saveSong() {
    this.setState({
      modal: true,
    });

    const fullSection: Section = {
      id: v4(),
      type: 'song',
      name: 'Sample Song',
      data: {
        title: 'Sample Song',
        content: this.state.slides.map(s => {
          return {
            id: s.id,
            slides: s.body.split('\n'),
          };
        }),
        order: this.state.slides.map(s => s.id),
      },
    };

    PresentationActions.addSection(fullSection);

    this.setState({
      goHome: true,
    });
  }

  handleIdChange(e: any, index: number) {
    const slides = this.state.slides;
    slides[index].id = e.target.value;
    this.setState({
      slides: slides,
    });
  }

  handleBodyChange(e: any, index: number) {
    const slides = this.state.slides;
    slides[index].body = e.target.value;
    this.setState({
      slides: slides,
    });
  }

  render() {
    if (this.state.goHome) {
      return <Redirect to="/" push={true} />;
    }

    return (
      <div>
        <main id="page-wrap">
          <div className="song-container">
            <h1>Add Song</h1>
            <form>
              {[...this.state.slides].map((slide, i) => (
                <div className="form-row">
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id={`${i}-slide-name`}
                      name={`${i}_slide_name`}
                      placeholder="Name"
                      onChange={e => this.handleIdChange(e, i)}
                    />
                  </div>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      rows={5}
                      id="comment"
                      onChange={e => this.handleBodyChange(e, i)}
                    />
                  </div>
                </div>
              ))}
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => this.addSlide()}>
                + Add Slide
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => this.saveSong()}>
                Save Song
              </button>
            </form>
          </div>
        </main>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Saving Passage...</ModalHeader>
          <ModalBody>
            <div className="animationload">
              <div className="osahanloading" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Do Something</Button>{' '}
            <Button color="secondary">Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
