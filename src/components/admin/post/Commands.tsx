import { Badge} from "reactstrap"

type Commands = {
  data: any
  update: Function,
  delete: Function
}
function Commands(params: Commands) {
  function sendUpdate() {
    params.update(params.data)
  }
  function sendDelete() {
    params.delete(params.data)
  }

  return (
    <>
      <Badge
      color="info"
      className="hoverClassForButtons"
      onClick={sendUpdate}
      style={{marginRight: '0.5em'}}
      >
        Alterar
      </Badge>
      <Badge
      className="hoverClassForButtons"
      onClick={sendDelete}
      color="danger"
      >
        Excluir
      </Badge>
    </>
  )
}

export default Commands