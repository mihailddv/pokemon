import React from 'react';
import Container from 'UI/Container';
import Page from 'UI/Page';
import Button from 'UI/Button';
import Tooltip from 'UI/Icons/Tooltip';
import Loader from 'Components/Loader';
import Error from 'Components/Error';

import usePokemon from './hooks';

import styles from './Pokemon.module.scss';

const Pokemon = ({ match }) => {
  const slug = match.params.id;
  const hook = usePokemon(slug);

  const stats = [
    {
      name: 'height',
      stat: hook.response?.height,
    },
    {
      name: 'weight',
      stat: hook.response?.weight,
    },
    {
      name: 'hp',
      stat: hook.response?.stats[0]?.base_stat,
    },
    {
      name: 'attack',
      stat: hook.response?.stats[1]?.base_stat,
    },
    {
      name: 'defense',
      stat: hook.response?.stats[2]?.base_stat,
    },
    {
      name: 'special attack',
      stat: hook.response?.stats[3]?.base_stat,
    },
    {
      name: 'special defence',
      stat: hook.response?.stats[4]?.base_stat,
    },
  ];

  return (
    <Container>
      <Page>
        {hook.isLoading && <Loader />}
        {hook.error && <Error />}
        {!hook.isLoading && !hook.error && (
          <div className={styles.container}>
            <div className={styles.caption}>
              <h1 className={styles.title}>{hook.response?.name}</h1>
            </div>
            <div className={styles.pokemon}>
              <div className={styles.main}>
                <div className={styles.picture}>
                  {hook.response?.sprites?.other?.dream_world?.front_default ? (
                    <img
                      src={
                        hook.response?.sprites?.other?.dream_world
                          ?.front_default
                      }
                      alt={hook.response?.name}
                    />
                  ) : (
                    <img src={hook.response?.sprites?.front_default} />
                  )}
                </div>
                <div className={styles.compare}>
                  <Button
                    text={
                      hook.isAddedToCompare
                        ? 'Remove from comparison'
                        : 'Add to Compare'
                    }
                    onClick={() => hook.handleCompare(hook.response?.name)}
                  />
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.stats}>
                  <table>
                    <thead>
                      <tr>
                        <th>Stats</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(stats).map((item, index) => {
                        const { name, stat } = item;
                        return (
                          <tr className={styles.stat} key={index}>
                            <td className={styles.statName}>{name}</td>
                            <td className={styles.statValue}>{stat}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className={styles.special}>
                  <h3 className={styles.specialTitle}>Special attack:</h3>
                  {hook.response && (
                    <>
                      {Object.values(hook.response?.abilities).map(
                        (item, index) => {
                          const { ability } = item;
                          return (
                            <div className={styles.specialItem} key={index}>
                              <div>{ability?.name}</div>
                              <div
                                className={styles.specialInfo}
                                onMouseEnter={() =>
                                  hook.onToggleOpen(ability?.url)
                                }
                              >
                                <Tooltip />
                                <div className={styles.specialTooltip}>
                                  {hook.isLoadingAbility ? (
                                    <Loader />
                                  ) : (
                                    hook.currentAbility
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Page>
    </Container>
  );
};

export default React.memo(Pokemon);
