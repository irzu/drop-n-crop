import React, { Component } from 'react'
import Cropper from 'react-cropper'
import CropperControls from './components/CropperControls'
import DragDrop from './components/DragDrop'

import 'cropperjs/dist/cropper.min.css'
import './assets/css/bootstrap.min.css'
import './assets/css/App.css'

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {'uploadedImageFileName': true, initialized: false, sizeX: 640, sizeY:480, showB64: false}
  } 

  adjustCropBoxData() {
    this.refs.cropper.setCropBoxData(JSON.parse(this.state.cropBox))
    this.setState({initialized: true}) 
  }
  
  onDrop(file) {
      this.setState({cropBox: false, mediaId: false})
      let filename = file[0].name
      let ext = filename.split('.').pop()
      const extensions = ['bmp','png','jpg','jpeg','gif']
      if (extensions.indexOf(ext) === -1) {
        this.setState({uploadedImageFileName: false })
      }
      else {
        this.setState({uploadedImage: file[0].preview, uploadedImageFileName: file[0].name, fullFile: file[0]})
      }
  }

  getPreview() {
      let b64 = this.refs.cropper.getCroppedCanvas({width: this.state.sizeX, height: this.state.sizeY, fillColor: 'white'}).toDataURL()
      this.setState({croppedImage: b64})
  }

  onOptionChange(param,value) {
    this.setState({[param]: value})
  }

  onCropEdit(param,value) {
    let cropper = this.refs.cropper
    cropper[param](value)
  }
  
  render() {

    return (
      <div className="App container">
        
        <div className="row">
          <div className="col-md-12">
            <h3>drop-n-crop</h3>
            <h5><i>Crop your image to required size and save it or get its' base64 code</i></h5>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h4>Edit image</h4>
            <hr/>

            {this.state.initialized &&
            <CropperControls className='controls'
                             onEdit={(param,value) => this.onCropEdit(param,value)}
                             onOptionChange={(param,value) => this.onOptionChange(param,value)}
                             getPreview={() => this.getPreview()}
                             sizeX={this.state.sizeX}
                             sizeY={this.state.sizeY} />
            }
            <Cropper ref='cropper'
                     src = {this.state.uploadedImage}
                     guides={true}
                     style={{height: '66vh'}}
                     aspectRatio={this.state.sizeX / this.state.sizeY}
                     crop={() => this.adjustCropBoxData()}/>
          </div>

          <div className="col-md-6">
            <h4>Upload file</h4>
            <hr/>
  
            <div className={this.state.uploadedImageFileName ? 'hidden' :'visible'}>
              <div className="alert alert-danger">
                  <p>Incompatible image format. Please supply image in on of the following formats: jpg, png, gif or bmp.</p>
              </div>
            </div>
            <DragDrop onDrop={(file) => this.onDrop(file)}  />
            
            <h4>Crop result</h4>
            <hr/>

            {this.state.croppedImage &&
              <div> 
                <div>
                  <img src={this.state.croppedImage} style={{maxWidth: '100%', maxHeight: 500}} alt="User defined crop"/>
                </div>
                <div>
                  <button 
                    title="Show image code" className="btn btn-success btn-controls" 
                    onClick={() => this.setState({showB64: !this.state.showB64})} >
                    Show image code
                  </button>
                </div>
              </div>
            }

            {this.state.showB64 &&
              <div>
                <h4>Base 64 code</h4>
                <hr/>
                <div style={{overflow: 'auto'}}>
                  {this.state.croppedImage}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App