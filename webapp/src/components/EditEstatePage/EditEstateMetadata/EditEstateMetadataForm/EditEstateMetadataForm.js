import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input } from 'semantic-ui-react'

import TxStatus from 'components/TxStatus'
import { estateType } from 'components/types'
import { t } from '@dapps/modules/translation/utils'
import { preventDefault } from 'lib/utils'
import { isValidName, isValidDescription } from 'shared/asset'
import './EditEstateMetadataForm.css'

export default class EditEstateMetadataForm extends React.PureComponent {
  static propTypes = {
    estate: estateType.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isTxIdle: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    const { estate } = this.props
    this.initialEstate = estate
  }

  componentWillUnmount() {
    const { estate, onChange } = this.props
    onChange({
      ...estate,
      data: {
        ...estate.data,
        description: '',
        name: ''
      }
    })
  }

  handleNameChange = event => {
    const { estate, onChange } = this.props
    onChange({
      ...estate,
      data: {
        ...estate.data,
        name: event.target.value
      }
    })
  }

  handleDescriptionChange = event => {
    const { estate, onChange } = this.props
    onChange({
      ...estate,
      data: {
        ...estate.data,
        description: event.target.value
      }
    })
  }

  hasChanged() {
    const { data } = this.props.estate
    const { name, description } = this.initialEstate.data

    return (
      name.toString() !== data.name.toString() ||
      description.toString() !== data.description.toString()
    )
  }

  isValidName(name) {
    return !this.hasChanged() || isValidName(name)
  }

  isValidDescription(description) {
    return !this.hasChanged() || isValidDescription(description)
  }

  render() {
    const { onCancel, onSubmit, estate, isTxIdle } = this.props
    const { name, description } = estate.data

    const isValidName = this.isValidName(name)
    const isValidDescription = this.isValidDescription(description)

    return (
      <Form
        className="EditEstateMetadataForm"
        onSubmit={preventDefault(onSubmit)}
      >
        <Form.Field>
          <label>{t('estate_edit.name')}</label>
          <Input
            type="text"
            value={name}
            onChange={this.handleNameChange}
            error={!isValidName}
            autoFocus
          />
        </Form.Field>
        <Form.Field>
          <label>{t('estate_edit.description')}</label>
          <Input
            type="text"
            value={description}
            onChange={this.handleDescriptionChange}
            error={!isValidDescription}
          />
        </Form.Field>
        <TxStatus.Idle isIdle={isTxIdle} />
        <div className="modal-buttons">
          <Button type="button" onClick={onCancel}>
            {t('global.cancel')}
          </Button>
          <Button
            type="submit"
            primary={true}
            disabled={!this.hasChanged() || !isValidName || !isValidDescription}
          >
            {t('global.submit')}
          </Button>
        </div>
      </Form>
    )
  }
}
