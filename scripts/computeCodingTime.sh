#!/bin/zsh

# Ce script calcule le temps total de codage par auteur en se basant sur les commits Git.
# Il définit une durée maximum pour un commit individuel (en minutes).
# Il initialise un tableau associatif pour stocker le temps total par auteur.
# Il récupère la liste des commits (auteur et date) triée par date.
# Il initialise les variables pour suivre l'auteur précédent et le temps.
# Il boucle sur chaque commit (timestamp et auteur) pour calculer le temps de codage.
# Pour chaque commit, il vérifie si c'est le premier commit ou si c'est le même auteur que le commit précédent.
# Si c'est le même auteur et que la différence de temps entre les commits est inférieure à la durée maximum, 
# il ajoute cette différence au temps total de l'auteur.

# Définit la durée maximum d'un commit individuel (en minutes)
MAX_COMMIT_DURATION=10

# Initialise un tableau associatif pour stocker le temps total par auteur
typeset -A author_time

# Récupère la liste des commits (auteur et date) triée par date
commits=$(git log --pretty=format:'%ct|%an' --date-order)

# Initialise les variables pour suivre l'auteur précédent et le temps
previous_commit_time=0
previous_author=""

# Boucle sur chaque commit (timestamp et auteur)
while IFS="|" read -r commit_time author; do
    if [ "$previous_author" = "" ]; then
        # Premier commit, on initialise simplement les variables
        previous_commit_time=$commit_time
        previous_author="$author"
        author_time["$author"]=$((MAX_COMMIT_DURATION * 60))  # Ajoute 10 minutes pour ce premier commit
    else
        # Calcule la différence entre ce commit et le précédent
        time_diff=$((previous_commit_time - commit_time))

        if [ "$author" = "$previous_author" ]; then
            # Si c'est le même auteur
            if [ $time_diff -le $((MAX_COMMIT_DURATION * 60)) ]; then
                # Les commits sont dans la même session (<10 min d'écart)
                author_time["$author"]=$((author_time["$author"] + time_diff))
            else
                # Nouvelle session de 10 minutes
                author_time["$author"]=$((author_time["$author"] + MAX_COMMIT_DURATION * 60))
            fi
        else
            # Si c'est un nouvel auteur, on ajoute simplement une session de 10 minutes
            if [ -z "${author_time["$author"]}" ]; then
                author_time["$author"]=$((MAX_COMMIT_DURATION * 60))
            else
                author_time["$author"]=$((author_time["$author"] + MAX_COMMIT_DURATION * 60))
            fi
        fi

        # Met à jour le commit précédent et l'auteur
        previous_commit_time=$commit_time
        previous_author="$author"
    fi
done <<< "$commits"

# Affiche le temps total par auteur en heures, minutes, secondes
for author in ${(k)author_time}; do
    total_seconds=${author_time[$author]}
    hours=$((total_seconds / 3600))
    minutes=$(((total_seconds % 3600) / 60))
    seconds=$((total_seconds % 60))
    echo "$author: ${hours}h ${minutes}m ${seconds}s"
done