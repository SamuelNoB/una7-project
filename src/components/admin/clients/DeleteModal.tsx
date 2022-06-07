import { Client } from "@prisma/client"
import { useMutation } from "react-query"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import ClientService from "../../../services/ClientService"

type deleteParams = {
  open: boolean,
  afterDeleted: Function
  data?: Partial<Client>
  closeModal: any
}
function DeleteModal(params: deleteParams) {
  const client = params.data;

  const {data, error, isSuccess, mutate} = useMutation((id: string) => {
    return ClientService.deleteClient(id)
  })

  function deletePost() {
    mutate(client?.id as any)
    params.afterDeleted(client?.id)
    params.closeModal()
  }

  return (
    <>
      <Modal toggle={params.closeModal} isOpen={params.open}>
        <ModalHeader >
          Apagar Cliente de nome: {client?.name}
        </ModalHeader>
        <ModalBody>
          Após realizar a exclusão não será possível recuperar os dados do cliente.
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