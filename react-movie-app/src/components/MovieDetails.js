import PropTypes from 'prop-types';

function MovieDetails({ coverImg, title, rating, runtime, genres, description }){
  return (
    <div>
      <img src={coverImg} alt={title} />
      <h2>Title: {title}</h2>
      <p>Rating: {rating}</p>
      <p>Runtime: {runtime} minutes</p>
      <p>Genre: 
        {genres.map((genre, index) => (
          <span key={index}>
            {genre}

            {/* 현재 요소의 index가 마지막이 아니라면 콤마 찍기 */}
            {index !== genres.length - 1 && ', '}
          </span>
        ))}
      </p>
      <p>{description}</p>
    </div>
  )
}

MovieDetails.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
}

export default MovieDetails;