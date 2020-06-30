import React from 'react';
import Comments from './comments/comments';
import CommentsPopout from './comments/comments_popout';
import NavBar from '../navbar/navbar';
import './recipe.scss'
import { Link } from 'react-router-dom';
import { BsPlusCircleFill } from "react-icons/bs";


class RecipeShow extends React.Component {
  constructor(props) {
    super(props)
    
    this._comments = this._comments.bind(this)
  };

  componentDidMount(){
    window.scrollTo(0,0);
    this.props.fetchRecipe(this.props.recipeId);
  }

  _comments(key, idx){
    const {comments} = this.props;
    if (!comments) { return null };

    switch (key) {
      case "ingredients":
      case "instructions":
        return comments.filter( comment => (
          comment &&
          comment.section.key === key &&
          parseInt(comment.section.idx) === idx
        ));
      case "time":
      case "servings":
      case "recipe":
        return comments.filter( comment => ( comment && comment.section.key === key));
      default:
        return null;
    }
  }

  render() {
    const { recipe, addComment, deleteComment, session, pinRecipe, unpinRecipe } = this.props;

    if ( !recipe ) { return <></> };

    const image = recipe.image ? (
      <img className="recipe-show-image" src={recipe.image} alt="recipe" />
    ) : null;

    const author = recipe.author ? (
      <span className="recipe-author"><span>Submitted by:</span>
        <Link to={`/users/${recipe.author}`}>{recipe.authorUsername}</Link>
      </span>
    ) : <span className="recipe-author"><span>Source:</span>
          <a href={recipe.url}>{recipe.source}</a>
        </span>;

    const ingredients = recipe.ingredients.map( (ingredient, idx) => (
      <li key={ingredient._id}>
        {/* <span>{ingredient.fullName}</span> */}
        <CommentsPopout 
          spanContent={ingredient.fullName}
          recipeId={recipe._id}
          sectionKey='ingredients'
          idx={idx}
          comments={this._comments('ingredients', idx)}
          session={session}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      </li>
    ));

    const instructions = recipe.instructions.map((instruction, idx) => (
      <li key={idx}>
        {/* <span>{instruction}</span> */}
        <CommentsPopout
          spanContent={<><span>{`${(idx + 1)}. `}</span><span>{instruction}</span></>}
          recipeId={recipe._id}
          sectionKey='instructions'
          idx={idx}
          comments={this._comments('instructions', idx)}
          session={session}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      </li>
    ));

    // const pinButton = ( session.isAuthenticated && session.pinnedRecipes.includes(recipe._id) ) ?
    //     <button className='recipe-show-pin' onClick={() => pinRecipe(recipe._id)}>
    //       <BsPlusCircleFill className="rpm-pinRecipe-button" size={25} />
    //       <span className="rpm-pinRecipe-text pin-button">Pin recipe</span>
    //     </button>
    //   :
    //   <button className='recipe-show-unpin' onClick={() => unpinRecipe(recipe._id)}>
    //       <BsPlusCircleFill className="rpm-pinRecipe-button" size={25} />
    //       <span className="rpm-pinRecipe-text unpin-button">Unpin recipe</span>
    //     </button>
    
    return (
      <section className='recipe-show-page'>
        <NavBar />
        <div className='recipe-show-container'>

          {image}
          
          {/* {pinButton} */}

          <div className='recipe-show-information'>
            <h1>{recipe.name}</h1>
            {author}
            <span><span>Servings:</span> {recipe.servings}</span>
            <span><span>Total Time:</span> {recipe.time.total}</span>
          </div>

          <div className='recipe-show-main'>
            <div className="recipe-show-ingredients">
              <h2>Ingredients</h2>
              <ul>{ingredients}</ul>
            </div>

            <div className="recipe-show-instructions">
              <h2>Instructions</h2>
              <ul>{instructions}</ul>
            </div>

            <div className="recipe-show-servings">
              {/* <span>Servings: {recipe.servings}</span> */}
              <CommentsPopout
                spanContent={`Servings:  ${recipe.servings}`}
                recipeId={recipe._id}
                sectionKey='servings'
                comments={this._comments('servings')}
                session={session}
                addComment={addComment}
                deleteComment={deleteComment}
              />
            </div>

            <div className="recipe-show-time">
              {/* <span>Total Time: {recipe.time.total}</span> */}
              <CommentsPopout
                spanContent={`Total Time:  ${recipe.time.total}`}
                recipeId={recipe._id}
                sectionKey='time'
                comments={this._comments('time')}
                session={session}
                addComment={addComment}
                deleteComment={deleteComment}
              />
            </div>
          </div>

          

          <div className="recipe-general-comments">
            <h2>Comments</h2>
            <Comments
              recipeId={recipe._id}
              sectionKey='recipe'
              comments={this._comments('recipe')}
              session={session}
              addComment={addComment}
              deleteComment={deleteComment}
            />
          </div>
        </div>
      </section>
    )
  }
};

export default RecipeShow;