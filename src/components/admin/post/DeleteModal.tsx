import { MouseEventHandler, useEffect, useState } from "react"
import { useMutation } from "react-query"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import PostService from "../../../services/PostService"


type deleteParams = {
  open: boolean,
  afterDeleted: Function
  data?: SmallPublication
  closeModal: any
}
function DeleteModal(params: deleteParams) {
  const publication = params.data;

  const {data, error, isSuccess, mutate} = useMutation((id: string) => {
    return PostService.deletePost(id)
  })

  function deletePost() {
    mutate(publication?.id as any)
    params.afterDeleted(publication?.id)
    params.closeModal()
  }

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
            onClick={deletePost}
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