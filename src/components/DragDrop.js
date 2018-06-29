import React from 'react'
import Dropzone from 'react-dropzone'

export default class DragDrop extends React.Component {
    onDrop(files) {
      this.props.onDrop(files.map((file) => file))
    }

    render() {
      return (
          <div>
            <Dropzone onDrop={(files) => this.onDrop(files)} className='dropzone'>
              <div style={{textAlign:'center'}}>
                <span className='glyphicon glyphicon-download-alt' style={{fontSize:32, marginTop:2}} />
                <p style={{marginTop:10}}>Drop your image here, or click to select files to upload.</p>
              </div>
            </Dropzone>
          </div>
      )
    }
}