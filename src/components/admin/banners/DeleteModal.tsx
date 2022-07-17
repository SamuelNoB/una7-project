import { Banner } from "@prisma/client"
import BannerService from "@services/BannerService"
import { useMutation } from "react-query"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import ClientService from "../../../services/ClientService"

type deleteParams = {
  open: boolean,
  afterDeleted: Function
  data?: Partial<Banner>
  closeModal: any
}
function DeleteModal(params: deleteParams) {
  const banner = params.data;

  const {data, error, isSuccess, mutate} = useMutation((id: string) => {
    return BannerService.deleteBanner(id)
  })

  function deletePost() {
    mutate(banner?.id as any)
    params.afterDeleted(banner?.id)
    params.closeModal()
  }

  return (
    <>
      <Modal toggle={params.closeModal} isOpen={params.open}>
        <ModalHeader >
          Apagar Banner de nome: {banner?.name}
        </ModalHeader>
        <ModalBody>
          Após realizar a exclusão não será possível recuperar os dados do banner.
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