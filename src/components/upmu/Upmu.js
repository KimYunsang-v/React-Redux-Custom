import React, { Component }  from 'react';
import Modal from 'react-modal';
import { List, Map } from 'immutable';
import * as upmuActions from '../../stores/modules/saveUpmu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../../stores';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Upmu extends Component {

  state = {
    modalIsOpen: false
  };

  openModal = () => {
    console.log(this.state)
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  } 

  handleTitleChange = (e) => {
    const {UpmuActions} = this.props;
    UpmuActions.changeTitleInput(e.target.value);
  }

  handleContentChange = (e) => {
    const {UpmuActions} = this.props;
    UpmuActions.changeContentInput(e.target.value);
  }

  handleInsert = () => {
    const {saveUpmu} = store.getState();
    const {UpmuActions} = this.props;
    //const {titleInput, contentInput} = this.props;

    const upmu = {
        name: saveUpmu.get('titleInput'),
        contents: saveUpmu.get('contentInput')
    };

    console.log(upmu);
    UpmuActions.saveUpmu(upmu);
    this.closeModal();
  }

    render(){
      const { openModal }  = this;
      const {titleInput, contentInput, upmus} = this.props;
      const { handleTitleChange, handleContentChange, handleInsert } = this;
        return (
            <div>
              <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                >

                    <input value={titleInput} placeholder="name" onChange={handleTitleChange}/>
                    <input value={contentInput} placeholder="content" onChange={handleContentChange}/>
                    <button onClick={handleInsert}>add</button>
                    <button onClick={this.closeModal}>close</button>
                </Modal>
            </div>

              <h2>프로젝트</h2>
                <button onClick={openModal}>add</button>
                <button>delete</button>
                <button>update</button>
                <button>log</button>

              <ul>
                
              </ul>
            </div>
          );
    }
};

export default connect(
    (state) => ({
        titleInput: state.titleInput,
        contentInput: state.contentInput,
        upmus: state.upmus
    }),
    (dispatch) => ({
        //UpmuContentActions: bindActionCreators(upmuContentActions, dispatch),
        UpmuActions: bindActionCreators(upmuActions, dispatch)        
    })
)(Upmu);