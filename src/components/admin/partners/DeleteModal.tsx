import { Partner } from "@prisma/client"
import { MouseEventHandler, useEffect, useState } from "react"
import { useMutation } from "react-query"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import PartnerService from "@services/PartnerService"


type deleteParams = {
  open: boolean,
  afterDeleted: Function
  data?: Partner
  closeModal: any
}
function DeleteModal(params: deleteParams) {
  const partner = params.data;

  const {data, error, isSuccess, mutate} = useMutation((id: string) => {
    return PartnerService.deletePartner(id)
  })

  function deletePost() {
    mutate(partner?.id as any)
    params.afterDeleted(partner?.id)
    params.closeModal()
  }

  return (
    <>
      <Modal toggle={params.closeModal} isOpen={params.open}>
        <ModalHeader >
          Apagar parceiro de numero: {partner?.id}
        </ModalHeader>
        <ModalBody>
          <strong>Nome:</strong>{' '}{partner?.name}
          <br />
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