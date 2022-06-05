import { MouseEventHandler, useEffect, useState } from "react"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"


type deleteParams = {
  open: boolean,
  data?: SmallPublication
  closeModal: MouseEventHandler<HTMLElement>
}
function DeleteModal(params: deleteParams) {
  const publication = params.data;

  return (
    <>
      <Modal toggle={params.closeModal} isOpen={params.open}>
        <ModalHeader >
          Apagar publicação de numero: {publication?.id}
        </ModalHeader>
        <ModalBody>
          <strong>Título:</strong>{' '}{publication?.title}
          <br />
          <strong>Criado em: </strong>{' '}{publication?.createdDate}
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={function noRefCheck(){}}
          >
            Apagar
          </Button>
          {' '}
          <Button outline onClick={params.closeModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default DeleteModal