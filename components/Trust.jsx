import Reveal from "@/components/Reveal";
import { FEATURES } from "@/lib/content";

export default function Trust() {
  return (
    <section className="trust">
      <div className="wrap trust__grid">
        <Reveal className="circle">
          <b>100%</b>
          <span>Hand-coded. No page builders, no bloated templates.</span>
        </Reveal>

        <Reveal className="trustcard" delay={120}>
          <div className="trustcard__no">#01</div>
          <div>
            <h3>Built to be used, not just looked at</h3>
            <p>
              Every build ships <b>responsive</b>, <b>accessible</b> and <b>measured</b> — tested on
              desktop and mobile, tuned for SEO, and tracked in Google Analytics so decisions come
              from traffic and conversion data instead of guesswork.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="wrap trust__row">
        {FEATURES.map((f, i) => (
          <Reveal as="article" className="feature" delay={i * 110} key={f.no}>
            <div className="feature__no">{f.no}</div>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
