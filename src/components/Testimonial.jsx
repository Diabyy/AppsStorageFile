export default function Testimonial({ quote, author, role, variant }) {
  return (
    <section className={`testimonial ${variant === 'alt' ? 'testimonial--alt' : ''}`}>
      <div className="container testimonial__inner">
        <p className="testimonial__quote">{quote}</p>
        <div className="testimonial__author">
          <span className="testimonial__author-name">— {author}</span>
          <span className="testimonial__author-role">{role}</span>
        </div>
      </div>
    </section>
  )
}
