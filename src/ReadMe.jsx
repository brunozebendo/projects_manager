/*A ideia do projeto da seção 9 é criar uma página para incluir
projetos em uma aba do lado esquerdo e incluir tasks dentro desses projetos.
Quase um to-do list.
Primeiro, criou o componente abaixo, onde a novidade é a tag <aside>
que serve para incluir uma informação extra ao tema principal e normalmente
é usada para barras laterais, o que é o caso aqui
*/

export default function ProjectsSidebar (){
    return <aside>
        <h2>Your Projects</h2>
        <div>
            <button>
                + Add Projects
            </button>
        </div>
        <ul></ul>
    </aside>
}

/*Então, é importado para o App.jsx, envelopado no main*/

function App() {
  return (
    <main>
<ProjectsSidebar />    
  </main>
  );
}

/**então o componente é atualizado para receber estilo através de className q são
 * comandos do tailwind, por exemplo, w-1/3 significa q vai ocupar um terço da tela
 * text-stone-50 é a cor e por aí vai. Para entender, tem que visitar a página do
 * tailwind.
 */

return <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
        <div>
            <button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"></button>

            </div>
            </aside>
/*Na aula 169 vai ser incluído um novo componente que vai controlar
todos os inputs necessários para coletar os dados para incluir um novo projeto
para não precisar repetir o estilo 3 vezes ou mais, foi criado
um outro componente, o Input, somente para criar um padrão. Assim,
o NewProject ficou como abaixo, valendo esclarecer que a tag label
serve para relacionar um campo com outro, como um id*/

import Input from "./Input"

export default function NewProject () {
    return (
    <div>
        <menu>
            <li><button>Cancel</button></li>
            <li><button>Save</button></li>
            <li><button>Title</button></li>
        </menu>
        <div>
         <Input label="Title" /> 
         <Input label="Description" textarea/> 
         <Input label="Due Date" /> 
        </div>
    </div>
    );
}

/**Abaixo, o componente Input que recebe como props o label e a textarea(uma
 * área maior no input para o usuário escrever) e deixa em aberto(...props) para qualquer
 * outro props que possa ser criado seja uma textarea ou um input.
*/

export default function Input ({label, textarea, ...props }) {
    return <p>
        <label>{label}</label>
        {textarea ? <textarea {...props} /> : <input {...props} /> }
    </p>
}

/**Aula 170 estiliza os inputs e os botões, não vou copiar tudo aqui, para aprender tailwind
 * acho q teria q fazer um curso rápido, vou copiar uma parte só como exemplo
 */

const classes=
"w-full p-1 broder-b-2 rounded-sm border sotone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"

/**Aula 171 foi incluído um componente para customizar o button, lembrando q a
 * sintaxe children serve para passar o q estiver dentro da tag e o props para
 * aceitar qualquer outra característica q venha a ser incluída. Também foi criado
 * o componente Noprojectselected para ter um texto quando nenhum projeto estiver selecionado
*/

export default function Button({children, ...props}) {
    return (
        <button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
            {...props}>
            {children}
            </button>
    )
}

/**Aula 172 vai incluir o código para que o conteúdo dos inputs seja mostrado
 * condicionalmente, somente se o botão for clicado. O primeiro passo é 
 * criar state, já que tem que se mostrar algo condicionalmente na tela. Isso será
 * feito no componente App que vai ficar assim
 */
/**Assim, a função abaixo cria o state e seta como condição inicial
 * um selectedProjectId que vai servir como identificador do ID do 
 * projeto e se estiver null ou undefined vai servir para a lógica mais a frente,
 * já o projects vai ser o array que vai guardar os projetos.
 */
function App() {
    const[projectsState, setProjectsState]=useState({
      selectedProjectId: undefined,
      projects: []
    });
 /**Assim a função abaixo vai preservar o estado anterior e mudar a condição
  * para null e isso indicará que se está adicionando um novo projeto. */   
    function handleStartAddProject(){
      setProjectsState(prevState => {
        return {
          ...prevState,
          selectedProjectId: null,
        }
      });
    }
    /**Abaixo foi criado um prop onStartAddProject={handleStartAddProject} que 
     * passa a função acima criada. Fui então nos componentes onde essa função
     * será passada e o o prop foi passado como argumento na função e no onCLick do
     * button.
     * Aqui foi usada a seguinte lógica: foi criada uma variável para ter controle
     * se se trata de um novo projeto, assim, se for null é mostrado o componente
     * NewProject, com os campos para serem preenchidos, se não, é mostrado o outro
     * componente. No return é incluído essa variável.
     */
    let content;
    
    if(projectsState.selectedProjectId === null){
      content = <NewProject />
    } else if (projectsState.selectedProjectId === undefined) {
      content = <NoProjectSelect onStartAddProject={handleStartAddProject} />;
    }
    
      return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} />
       {content}
      </main>
      );
    }
    
    export default App;

    /**Na aula 173 vai explicar como salvar a informação que será inserida no formulário
     * para isso será usado refs já que só se quer ler os valores ali inseridos.
     * Assim, no componente NewProject é preciso um modo
     * de coletar as informações que serão inseridas nos inputs e para isso são criados 
     * os refs abaixo
     */

const title = useRef();
const description = useRef();
const dueDate = useRef ();

/**Mas como o Input é componente customizado e não o componente built-in, é
 * preciso ir no componente Input e lá fazer o fowardRef e passar o ref abaixo
 */
const Input = forwardRef ( function Input ({label, textarea, ...props }, ref)
...
<textarea ref={ref} className={classes} {...props} />
        ) : (
<input ref={ref} className={classes} {...props} />

/**Então os inputs podem receber os refs */

<Input ref={title} label="Title" /> 
<Input ref={description} label="Description" textarea/> 
<Input ref={dueDate} label="Due Date" /> 

/**o próximo passo é criar uma função para passar para o botão, essa função
 * cria variáveis para guardar o valor dos refs. Portanto, reiterando, é isso
 * que o ref faz, referências que vão servir de ligação entre os elementos.
*/

function handleSave () {
  const enteredTitle = title.current.value;
  const enteredDescription = description.current.value;
  const enteredDueDate = dueDate.current.value;
}
...

<div>
<Input ref={title} label="Title" /> 
<Input ref={description} label="Description" textarea/> 
<Input ref={dueDate} label="Due Date" /> 
</div>

/**Agora é preciso passar a informação para o App que é onde
 * ela será usada, ou seja, lift the satate up, primeiro é criada a função abaixo
 *A função recebe como argumento o projectData que irá conter os 3 dados
 do projeto, title, description, Duedata, e então o setProjectState, portanto,
  a função que controla o estado alterado do elemento, recebe o prevState que vai
  ser a junção entre o novo projeto (que vai receber os novos dados ...projectData)
  e um id que vai ser um número aleatório (o q não é o ideal, mas serve para o projeto)
  Então, retorna os projetos já existentes e o novo
 */

function handleAddProject (projectData) {
  setProjectsState(prevState=>{
    const NewProject = {
      ...projectData,
      id: Math.random()
    };
    return {
      ...prevState,
      projects:[...prevState.projects, NewProject ]
    }
  })
}

/**Agora, a função precisa ser convocada dentro do componente NewProject
 * que é onde a informação será coleta e isso ocorrerá via props, nomeado
 * onAdd, nesse caso.
 */

export default function NewProject ({onAdd}) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef ();
  
/**A função handleSave é então atualizada para receber via props os valores
 * recebidos nos inputs. Resumindo, o valor é inserido no input, passa por props
 * para o onAdd que é recebido na function NewProject (acima copiada) que passa por
 * ref para o input
 */

function handleSave () {
  const enteredTitle = title.current.value;
  const enteredDescription = description.current.value;
  const enteredDueDate = dueDate.current.value;

onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
  });
}

/**agora então o estado é elevado para o App, conforme o componente abaixo */

content = <NewProject onAdd={handleAddProject}/

/**A aula 174 vai adicionar o código para que o componente de formulário
 * suma da tela quando o botão save for clicado. Para isso, no componente App, dentro
 * do return da função que trata da inserção de novos elementos, o selectedProjectId
 * foi setado novamente para o seu valor inicial que é undefined, lembrando que 
 * esse item é o que estamos usando para controle da variável content que por sua
 * vez é usada para definir o que vai ser mostrado na tela inicial.
 */

return {
  ...prevState,
  selectedProjectId: undefined,
  projects:[...prevState.projects, NewProject ]
};
/**Também foi adicionada a lógica para que o compronente apareça na barra lateral
 * na forma de um botão. Primeiro, ainda no componente App, foi inserida a linha do
 * projects, sendo o projects o props que será passado para o componente ProjectsSideBar
 * o projectsState o state inicial e o projects o array que guarda todos os projetos.
 */
return (
  <main className="h-screen my-8 flex gap-8">
    <ProjectsSidebar onStartAddProject={handleStartAddProject}
    projects={projectsState.projects}/>
    {content}
    </main>

/**Já no componente ProjectsSidebar, dentro da tag <ul> que vai estar abaixo
 * do botão +AddProjects, vão ser exibidos os títulos do projeto em forma
 * de botão, por isso o map para guardar todos os projetos, utilizando
 * a key como identificador único.
 */

<ul className="mt-8">
            {projects.map(project => <li key={project.id}>
                <button className="w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800">
                    {project.title}
                </button>
            </li>)}
        </ul>

/**A aula 175 vai incluir o código para mostrar um modal com uma mensagem
 * caso algum dos campos esteja em branco, assim, no módulo NewProject é
 * inserido o código abaixo que faz a verificação se os campos não estão 
 * vazios e dá o comando para abrir o modal (tipo um alert) e dá um return
 * para o código parar
 */

if 
(enteredTitle.trim() === "" ||
 enteredDescription.trim() === "" ||
 enteredDueDate.trim() === "") {
    modal.current.open();
    return;
 }
 /**Abaixo é o código do modal que é uma caixa q abre quando o usuário
  * não digita os campos completos, a intenção é deixá-la o mais 
  * reaproveitável possível.
  */
/**Foram importado o forwardRef que permite que o componente
 receba refs no componente externo que for utilizá-lo,
 lembrando q isso é necessário por ser um componente
 feito por nós e não um built in. O useImperativeHandle é o que 
 vai permitir que a função abaixo criada, seja usada pelo componente
 filho também, função :

 open(){
            dialog.current.showModal();
  Também foi utilizado o createPortal para que o componente seja
  chamado em outro local da árvore DOM, portanto o document.getElementById('modal-root')
  se relaciona com uma tag criada no Index.html, como já expliquei antes.
 */

import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom"
/**Reparar na sintaxe do forwardRef que encapsula a função, nos props
 * children (q serve para passar todo o conteúdo do componente) e buttonCaption(
 * que serve para que o conteúdo do botão seja criad dentro do componente que
 * o for usar).
 * Também reparar que o useRef recebe o nome dialog que é recebido na tag form
 * assim, o ref serve para passar uma referência aquele componente no html, referência
 * que dá acesso ao conteúdo desse componente, como, dialog.current.showModal();,
 * sendo showModal um método provido pelo tag dialog. Pelo que entendi, 
 * incluindo o método dialog, o button já assume as funções, uma delas
 * a de fechar o modal.
 */
const Modal = forwardRef(function Modal({children, buttonCaption}, ref){
const dialog = useRef();

useImperativeHandle(ref, ()=> {
    return {
        open(){
            dialog.current.showModal();
        }
    };
});
    return createPortal(<dialog>
        {children}
        <form method='dialog'>
            <button>{buttonCaption}</button>
        </form>
    </dialog>,
    document.getElementById('modal-root')
    );
});

export default Modal;

/**Assim, no componente, NewProject que é onde o modal será usado, é criado um novo 
 * ref
 */

export default function NewProject ({onAdd}) {
  const modal = useRef();
/**e esse ref é usado abaixo no return do componente que, em resumo, vai receber
 * as características do componente que foi criado, mas vai customizar o o button
 * e o texto a ser exibido.
 */
<Modal ref={modal} buttonCaption="Okay">
        <h2>Invalid Input</h2>
        <p>You forgot to enter a value</p>
        <p>Make sure do provide a valid for every input field</p>
    </Modal>

/**Na aula 176 foi aplicado estilo ao modal e foi criada uma função
 * para o botão de cancel do formulário que volta a tela para o modo
 * inicial, ou seja, cancela o formulário. Para isso foi criada a função 
 * abaixo no componente App, essa função simplesmente muda o valor do selectedProjectId,
 * fazendo o contrário da função anterior (boa possibilidade de refatorar)
 */
function handleCancelAddProject () {
  setProjectsState(prevState => {
    return {
      ...prevState,
      selectedProjectId: undefined,
    }
  });
}
/**Ainda dentro do App ela é passada como props */
content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}

/**Esse props é recebido no componente NewProject */

export default function NewProject ({onAdd, onCancel})

/**E passado para o button */

<li><button className="text-stone-800 hover:text-stone-950"
onClick={onCancel}>
   Cancel</button></li>

/**A aula 177 vai tornar o projeto que está no menu à direita, clicável, para isso
 * vai criado um novo componente, o SelectedProject, que é um componente bem padrão
 * apenas para mostrar os itens do objeto selecionada na tela.
*/

export default function SelectedProject({project}){

  const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day:'numeric',
  });
      return <div className="w-[35rem] mt-16">
          <header className="pb-4 mb-4 border-b-2 border-stone-300">
              <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
          <button className="text-stone=600 hover:text-stone-950"></button>
             </div>
          <p className="mb-4 text-stone-400">{formattedDate}</p>
          <p className="text-stone-60 whitespace-pre-wrap">{project.description}</p>
          </header>
          Tasks
      </div>
  }

  /**Agora é preciso certificar que o projeta será clicável na barra 
   * de lado, para isso é criada uma função no App component, essa função faz
   * a mesma coisa que as outras, retorna uma tarefa, mas desta vez, pelo id da
   * tarefa
   */

  function handleSelectProject(id)
 {setProjectsState(prevState => {
  return {
    ...prevState,
    selectedProjectId: id,
  };
});
}

/**Então, ainda dentro do App, no return, é passado o props onSelectedProject
 * para conseguir passar a função para o componente ProjectsSidebar
 */

return (
  <main className="h-screen my-8 flex gap-8">
    <ProjectsSidebar
    onStartAddProject={handleStartAddProject}
    projects={projectsState.projects}
    onSelectProject={handleSelectProject}
    />
</main>
/**No componente ProjectSideBar, seguindo o padrão, o props é passado no começo */

export default function ProjectsSidebar ({
  onStartAddProject, projects, onSelectProject, selectedProjectId })

  /**Então é retornado no button, reparar que aqui o item é o próprio botão, 
   * assim, quando o usuário passa o mouse por cima, o item é destacado e se clicado
   * mostra o item na tela da esquerda. Reparar também que no onClick não é passado
   * diretamente o props, mas através de uma função, foi necessário passar uma função
   * e não somente o props, pois tem que passar também a informação do id, ou o sistema
   * dá erro pois não sabe qual projeto está sendo selecionado...(algo assim)
   * 
   */

  (
    <li key={project.id}>
    <button
    className={cssClasses}
    onClick={() => onSelectProject(project.id)}
    >
        {project.title}
    </button>

  </li>

  /** abaixo, a lógica para escurecer o botão que está sendo selecionado
   * quando o mouse passar por cima
   */

  {projects.map((project) => {
    let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800"

    if (project.id === selectedProjectId) {
        cssClasses += ' bg-stone-800 text-stone-200'            
    } else {
        cssClasses += ' text-stone-400'
    }

/**De volta ao componente App é inserida a lógica para retornar somente o elemento
 * selecionado, portanto, a variável selectedProject vai guardar o resultado da
 * função find que vai procurar o id do objeto selecionado dentro do array projects
 * e esse conteúdo é o que vai ser mostrado no molde do componente SelectedProject
 */

const selectedProject = 
projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

let content= <SelectedProject project={selectedProject} />;

/**Na aula 178 é criada a função para deletar a tarefa quando ela estiver selecionada
 * Para isso, dentro do App, foi criada a função abaixo, ela vai retornar o estado
 * prévio do array, como todas as outras, mas vai usar uma sintaxe diferente
 * para filtrar o array e manter somente o que for diferente (!==) do id que
 * está selecionado naquele momento  
 */

function handleDeleteProject () {
  setProjectsState((prevState) => {
    return {
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      ),
    };
  });
}
/**Depois a função é passada como props dentro do componente SelectedProject
 * que é o que vai utilizá-la
 */

let content= <SelectedProject project={selectedProject} onDelete={handleDeleteProject} />;

/**No componente ele é recebido como props e passado no botão */

export default function SelectedProject({project, onDelete})
...

<button className="text-stone=600 hover:text-stone-950" 
        onClick={onDelete}>Delete</button>

/**A aula 180 adiciona o código que possibilita a inclusão do campo tasks
 * que é um campo que fica abaixo e dentro do projects e permite
 * adicionar novas tarefas ao projeto. Para isso o professor usou
 * useState ao invés de useRef. No entanto, a aula é muito longa para explicar
 * aqui, além disso, por ser um componente dentro do outro, o state é 
 * passado para vários componentes, já que a informação
 * do input é obtida no NewTask, mas guardada em uma array no App e mostrada
 * no componente NewProject, dificultando o controle do estado,
 * a isso se dá o nome de prop drill o que será modificado no próximo módulo
 * aparentemente. Já a aula 181 inclui a função de deletar a task, o que é
 * bem similar a de deletar o project e corrigi pequenos bugs. 
 */