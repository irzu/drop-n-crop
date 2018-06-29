import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrop, faAngleLeft, faAngleRight, faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/bootstrap.min.css'

export default class CropperControls extends React.Component {

  edit(param,value) {
    this.props.onEdit(param,value)
  }

  option(param,value) {
    this.props.onOptionChange(param,value)
  }

  render() {
    
    let b = 'btn btn-primary btn-controls'
    
    return (
      <div className='controls'>
        <div className="form-inline"> 
          <h4>Specify result crop size (px)</h4> 
          <div className="form-group">
            <label htmlFor="sizex">size x</label>
            <input id="sizex" type="text" className="form-control" 
                   value={this.props.sizeX} onChange={(e) => this.option('sizeX',e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="sizey">size y </label>
            <input id="sizey" type="text" className="form-control" 
                   value={this.props.sizeY} onChange={(e) => this.option('sizeY', e.target.value)}/>
          </div>
        </div>
        <div>
          <span>
            <button title="Rotate 45deg left" className={b} onClick={() => this.edit('rotate', -45) }>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button title="Rotate 45deg right" className={b} onClick={() => this.edit('rotate', 45) }>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <button title="Zoom in 10%" className={b} onClick={() => this.edit('zoom', 0.1) }>
              <FontAwesomeIcon icon={faSearchPlus} />
            </button>     
            <button title="Zoom out 10%" className={b} onClick={() => this.edit('zoom', -0.1) }>
              <FontAwesomeIcon icon={faSearchMinus} />
            </button>
            <button title="Crop it!" className={b} onClick={() => this.props.getPreview()}>
              <FontAwesomeIcon icon={faCrop} /> Crop!
            </button>
          </span>
        </div>
      </div>
    )
  }
}