import React, { Fragment, } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Tooltip, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup} from 'reactstrap';
import { MdFileDownload } from 'react-icons/md'
import { useForm } from './useForm';

export const Testhook = () => {

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formValues)
  }
  const [formValues, handleInputChange] = useForm({
    valor:"",
  })
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
            <Label for="firstname">First Name</Label>
            <Input name="valor" onChange={handleInputChange}></Input>
          </FormGroup>
          <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}
