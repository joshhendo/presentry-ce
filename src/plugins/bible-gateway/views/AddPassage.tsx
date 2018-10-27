import * as React from 'react';
import './AddPassage.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { BibleBooks } from '../data/bible-books-static';
import { getPassage } from '../bible-gateway-gateway';
import { Redirect } from 'react-router';

export default class AddPassage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modal: false,
      goHome: false,
    };
    this.setState({ from_book_chapter: 'Genesis' });
  }

  async processPassage() {
    this.setState({
      modal: true,
    });

    const result = await getPassage({
      book: this.state.from_book,
      chapter: this.state.from_chapter,
      verse: this.state.from_verse || null,
    });

    alert(JSON.stringify(result));

    this.setState({
      modal: false,
      goHome: true,
    });
  }

  handleChange(e: any) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.goHome) {
      return <Redirect to="/" push={true} />;
    }

    return (
      <div>
        <main id="page-wrap">
          <div className="passage-container">
            <h1>Add Passage</h1>
            <form>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <select
                    id="from-book"
                    name="from_book"
                    className="form-control"
                    onChange={e => this.handleChange(e)}>
                    {BibleBooks.map((book: string, i: number) => (
                      <option key={i} value={book}>
                        {book}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="from-chapter"
                    name="from_chapter"
                    placeholder="chapter"
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="from-verse"
                    name="from_verse"
                    placeholder="verse"
                    onChange={e => this.handleChange(e)}
                  />
                </div>
              </div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => this.processPassage()}>
                Add Passage
              </button>
            </form>
          </div>
        </main>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Getting Passage...</ModalHeader>
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
